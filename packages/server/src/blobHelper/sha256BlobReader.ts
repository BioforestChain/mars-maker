import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { sleep } from "@bfchain/util-extends-promise";
import { BLOBS_SAVE_DIR, BLOBS_TEMPS_SAVE_DIR, BLOB_MAX_OPEN_TIMES, getUUID, isEmptyObject } from "./constants";

const blobsRootPath = path.join(process.cwd(), BLOBS_SAVE_DIR);
const blobsTempsRootPath = path.join(process.cwd(), BLOBS_TEMPS_SAVE_DIR);

export class Sha256BlobReader implements BFChainCore.BlobReader {
    /**Map<hash, pointer> */
    private __openBlobsKV = new Map<string, string>();
    /**Map<pointer, hash> */
    private __openBlobsVK = new Map<string, string>();
    /**Map<pointer, fd> */
    private __openBlobsMap = new Map<string, number>();
    private __blobsOpenInfo: {
        [pointer: string]: {
            times: number;
            openTime: number;
        };
    } = {};

    private __isClearRunning = false;

    /**
     * 定期关闭长时间打开的 blob，防止内存泄漏
     *
     */
    private async __closeUselessBlob() {
        if (this.__isClearRunning) {
            return;
        }
        this.__isClearRunning = true;
        /**每 10 分钟检查一次 */
        const checkInterval = 60 * 10000;
        console.debug(`Begin to monitor opened blob per ${checkInterval} ms`);
        while (true) {
            try {
                const nowTime = Date.now();
                for (const pointer in this.__blobsOpenInfo) {
                    const openInfo = this.__blobsOpenInfo[pointer];
                    if (openInfo.times === 0 || nowTime - openInfo.openTime > BLOB_MAX_OPEN_TIMES) {
                        await this.close(pointer);
                    }
                }
                await sleep(checkInterval);
                if (isEmptyObject(this.__blobsOpenInfo)) {
                    this.__isClearRunning = false;
                    console.debug(`No opened blob left, stop monitor`);
                    break;
                }
            } catch (error) {}
        }
    }

    private __getBlobSavePath(hash: string) {
        return path.join(blobsRootPath, hash);
    }
    private __getBlobTempSavePath(hash: string) {
        return path.join(blobsTempsRootPath, hash);
    }

    private __encode(bytes: Buffer, encoding: BufferEncoding = "hex") {
        return bytes.toString(encoding);
    }

    has(hash: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            return resolve(fs.existsSync(this.__getBlobSavePath(hash)) || fs.existsSync(this.__getBlobTempSavePath(hash)));
        });
    }

    open(hash: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let pointer = this.__openBlobsKV.get(hash);
            if (pointer) {
                this.__blobsOpenInfo[pointer].times++;
                this.__closeUselessBlob();
                return resolve(pointer);
            }
            let blobPath = this.__getBlobSavePath(hash);
            if (!fs.existsSync(blobPath)) {
                blobPath = this.__getBlobTempSavePath(hash);
                if (!fs.existsSync(blobPath)) {
                    return reject(new Error(`blob not exist hash ${hash}`));
                }
            }
            fs.open(blobPath, "r", (err, fd) => {
                if (err) {
                    return reject(err);
                }
                const pointer = getUUID();
                this.__openBlobsKV.set(hash, pointer);
                this.__openBlobsVK.set(pointer, hash);
                this.__openBlobsMap.set(pointer, fd);
                this.__blobsOpenInfo[pointer] = {
                    times: 1,
                    openTime: Date.now(),
                };
                this.__closeUselessBlob();
                console.debug(`open blob hash ${hash}, pointer ${pointer} success`);
                return resolve(pointer);
            });
        });
    }

    state(pointer: string): Promise<BFChainCore.BlobMetadata> {
        return new Promise<BFChainCore.BlobMetadata>((resolve, reject) => {
            const realFd = this.__openBlobsMap.get(pointer);
            if (!realFd) {
                return reject(new Error(`blob not open ${pointer}`));
            }
            fs.fstat(realFd, (err, stats) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    contentType: "bytes",
                    size: stats.size,
                });
            });
        });
    }

    read(pointer: string, start: number, end: number): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            const realFd = this.__openBlobsMap.get(pointer);
            if (!realFd) {
                return reject(new Error(`blob not open ${pointer}`));
            }
            fs.read(realFd, Buffer.alloc(end - start), 0, end - start, start, (err, bytesRead, buffer) => {
                if (err) {
                    return reject(err);
                }
                return resolve(buffer.slice(0, bytesRead));
            });
        });
    }

    close(pointer: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const realFd = this.__openBlobsMap.get(pointer);
            if (!realFd) {
                return resolve();
            }
            fs.close(realFd, (err) => {
                if (err) {
                    return reject(err);
                }
                this.__blobsOpenInfo[pointer].times--;
                const hash = this.__openBlobsVK.get(pointer);
                if (hash) {
                    if (this.__blobsOpenInfo[pointer].times === 0) {
                        this.__openBlobsKV.delete(hash);
                        this.__openBlobsVK.delete(pointer);
                        this.__openBlobsMap.delete(pointer);
                        delete this.__blobsOpenInfo[pointer];
                    }
                    console.debug(`close blob hash ${hash}, pointer ${pointer} success`);
                }
                return resolve();
            });
        });
    }

    /**
     * 验证 blob hash
     *
     * @param hash
     * @param size
     * @returns
     */
    async verifyBlob(hash: string, size: number) {
        return new Promise<void>(async (resolve, reject) => {
            try {
                const pointer = await this.open(hash);
                const fd = this.__openBlobsMap.get(pointer);
                if (!fd) {
                    return reject(new Error(`blob with hash ${hash} is invalid`));
                }
                const buffer = Buffer.alloc(size);
                const bytesRead = fs.readSync(fd, buffer, 0, size, 0);
                await this.close(pointer);
                const calcHash = this.__encode(crypto.createHash("sha256").update(buffer.slice(0, bytesRead)).digest());
                if (hash !== calcHash) {
                    return reject(new Error(`blob is invalid, hash ${hash}, calcHash ${calcHash}`));
                }
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    }
}
