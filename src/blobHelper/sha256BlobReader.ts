import type { Logger } from "../logger";
import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { BLOB_CONTENT_TYPE } from "@bfchain/core";
import { sleep } from "@bfchain/util-extends-promise";
import { BLOBS_SAVE_DIR, BLOBS_TEMPS_SAVE_DIR, BLOB_MAX_OPEN_TIMES, getUUID, isEmptyObject } from "./constants";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";

const { ArgumentIllegalException } = TransactionMakerExceptionGenerator("TransactionMaker", __filename);

const blobsRootPath = path.join(process.cwd(), BLOBS_SAVE_DIR);
const blobsTempsRootPath = path.join(process.cwd(), BLOBS_TEMPS_SAVE_DIR);

export class Sha256BlobReader implements BFChainCore.BlobReader {
    constructor(private __logger: Logger) {}
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
        const checkInterval = 10 * 60 * 1000;
        this.__logger.debug(`Begin to monitor opened blob per ${checkInterval} ms`);
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
                    this.__logger.debug(`No opened blob left, stop monitor`);
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

    open(hash: string): Promise<BFChainCore.OpenBlobReturnParams> {
        return new Promise<BFChainCore.OpenBlobReturnParams>((resolve, reject) => {
            const nowTime = new Date();
            let pointer = this.__openBlobsKV.get(hash);
            if (pointer) {
                this.__blobsOpenInfo[pointer].times++;
                this.__blobsOpenInfo[pointer].openTime = nowTime.getTime();
                this.__closeUselessBlob();
                return resolve({ descriptor: pointer, contentType: BLOB_CONTENT_TYPE.BYTES });
            }
            let blobPath = this.__getBlobSavePath(hash);
            if (!fs.existsSync(blobPath)) {
                blobPath = this.__getBlobTempSavePath(hash);
                if (!fs.existsSync(blobPath)) {
                    return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_NOT_EXIST, { hash }));
                }
            }
            /// 修改文件的访问时间，防止最近使用的文件被清理器移除
            fs.utimesSync(blobPath, nowTime, nowTime);
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
                    openTime: nowTime.getTime(),
                };
                this.__closeUselessBlob();
                this.__logger.debug(`open blob hash ${hash}, pointer ${pointer} success`);
                return resolve({ descriptor: pointer, contentType: BLOB_CONTENT_TYPE.BYTES });
            });
        });
    }

    state(pointer: string): Promise<BFChainCore.BlobMetadata> {
        return new Promise<BFChainCore.BlobMetadata>((resolve, reject) => {
            const realFd = this.__openBlobsMap.get(pointer);
            if (!realFd) {
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_NOT_OPEN, { pointer }));
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
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_NOT_OPEN, { pointer }));
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
            const hash = this.__openBlobsVK.get(pointer);
            if (!hash) {
                return resolve();
            }
            try {
                // 这里在并发的时候可能报错，但是这个错无关紧要，文件超时后会自动关闭
                this.__blobsOpenInfo[pointer].times--;
                if (this.__blobsOpenInfo[pointer].times > 0) {
                    return resolve();
                }
                fs.close(realFd, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    this.__openBlobsKV.delete(hash);
                    this.__openBlobsVK.delete(pointer);
                    this.__openBlobsMap.delete(pointer);
                    delete this.__blobsOpenInfo[pointer];
                    this.__logger.debug(`close blob hash ${hash}, pointer ${pointer} success`);
                    return resolve();
                });
            } catch (error) {
                return resolve();
            }
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
                if (!Number.isInteger(size)) {
                    throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_INVALID, {
                        prop: "size",
                        value: size,
                        target: "transaction",
                    });
                }
                if (size <= 0) {
                    throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_INVALID, {
                        prop: "size",
                        value: size,
                        target: "transaction",
                    });
                }
                const { descriptor: pointer } = await this.open(hash);
                const fd = this.__openBlobsMap.get(pointer);
                if (!fd) {
                    return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_NOT_EXIST, { hash }));
                }
                const buffer = Buffer.alloc(size);
                const bytesRead = fs.readSync(fd, buffer, 0, size, 0);
                await this.close(pointer);
                const calcHash = this.__encode(crypto.createHash("sha256").update(buffer.slice(0, bytesRead)).digest());
                if (hash !== calcHash) {
                    return reject(
                        new ArgumentIllegalException(ERROR_LIST.NOT_MATCH, {
                            to_compare_prop: `hash ${hash}`,
                            to_target: "transaction",
                            be_compare_prop: `hash ${calcHash}`,
                            be_target: "calculate",
                        })
                    );
                }
                return resolve();
            } catch (error) {
                return reject(error);
            }
        });
    }
}
