import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { STORAGE_STRATEGY } from "@bfchain/core-helper-blob";
import { BLOBS_SAVE_DIR, BLOBS_TEMPS_SAVE_DIR, BLOBS_CHUNKS_SAVE_DIR, getUUID } from "./constants";

const blobsRootPath = path.join(process.cwd(), BLOBS_SAVE_DIR);
const blobsTempsRootPath = path.join(process.cwd(), BLOBS_TEMPS_SAVE_DIR);
const blobsChunksRootPath = path.join(process.cwd(), BLOBS_CHUNKS_SAVE_DIR);

export class Sha256BlobWriter implements BFChainCore.BlobWriter {
    constructor() {
        if (!fs.existsSync(blobsRootPath)) {
            fs.mkdirSync(blobsRootPath, { recursive: true });
        }
        if (!fs.existsSync(blobsChunksRootPath)) {
            fs.mkdirSync(blobsChunksRootPath, { recursive: true });
        }
        if (!fs.existsSync(blobsTempsRootPath)) {
            fs.mkdirSync(blobsTempsRootPath, { recursive: true });
        }
    }

    /**Map<hash, pointer> */
    private __openBlobsKV = new Map<string, string>();
    /**Map<pointer: hash> */
    private __openBlobsVK = new Map<string, string>();

    private __getBlobSavePath(hash: string) {
        return path.join(blobsRootPath, hash);
    }
    private __getBlobTempSavePath(hash: string) {
        return path.join(blobsTempsRootPath, hash);
    }
    private __getBlobChunkSavePath(hash: string) {
        return path.join(blobsChunksRootPath, hash);
    }

    private __encode(bytes: Buffer, encoding: BufferEncoding = "hex") {
        return bytes.toString(encoding);
    }

    requestStorage(
        openArg: BFChainCore.OpenBlobArgJSON,
        totalSize: number,
        chunkSize: number,
        contentType: string,
        strategy: STORAGE_STRATEGY
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const { hash } = openArg;
            let pointer = this.__openBlobsKV.get(hash);
            if (pointer) {
                return resolve(pointer);
            }
            /// blob 已经存在
            const blobTempSavePath = this.__getBlobTempSavePath(hash);
            if (fs.existsSync(blobTempSavePath)) {
                return reject(new Error(`blob already exist ${hash}`));
            }
            const blobSavePath = this.__getBlobSavePath(hash);
            if (fs.existsSync(blobSavePath)) {
                return reject(new Error(`blob already exist ${hash}`));
            }
            /// 申请分片存储空间
            const blobChunkSavePath = this.__getBlobChunkSavePath(hash);
            if (!fs.existsSync(blobChunkSavePath)) {
                fs.mkdirSync(blobChunkSavePath, { recursive: true });
            }
            /// 申请逻辑指针
            pointer = getUUID();
            this.__openBlobsKV.set(hash, pointer);
            this.__openBlobsVK.set(pointer, hash);
            return resolve(pointer);
        });
    }

    saveChunk(pointer: string, index: number, chunk: Uint8Array): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const hash = this.__openBlobsVK.get(pointer);
            if (!hash) {
                return reject(new Error(`blob chunk storage loss, should not happen ${pointer}`));
            }
            const blobChunkSavePath = this.__getBlobChunkSavePath(hash);
            if (!fs.existsSync(blobChunkSavePath)) {
                return reject(new Error(`blob chunk storage loss, should not happen ${hash}`));
            }
            fs.writeFile(path.join(blobChunkSavePath, index.toString()), chunk, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    saveAsBlob(pointer: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            const hash = this.__openBlobsVK.get(pointer);
            if (!hash) {
                return reject(new Error(`blob storage address loss, should not happen ${pointer}`));
            }
            /// 分片丢失
            const blobChunkSaveDirPath = this.__getBlobChunkSavePath(hash);
            if (!fs.existsSync(blobChunkSaveDirPath)) {
                return reject(new Error(`blob chunk loss, should not happen ${hash}`));
            }
            const chunks = fs.readdirSync(blobChunkSaveDirPath);
            if (chunks.length === 0) {
                return reject(new Error(`blob chunk loss, should not happen ${hash}`));
            }
            /// 合并分片并且计算 hash
            let isSuccess = false;
            const blobTempSavePath = this.__getBlobTempSavePath(hash);
            const calcHash = crypto.createHash("sha256");
            let readStream!: fs.ReadStream;
            let writeStream!: fs.WriteStream;
            try {
                writeStream = fs.createWriteStream(blobTempSavePath);
                writeStream.on("error", (err) => {
                    return reject(err);
                });
                writeStream.on("drain", () => {
                    readStream && readStream.resume();
                });
                const appendChunk = (chunkName: string) => {
                    return new Promise<boolean>((resolve, reject) => {
                        readStream = fs.createReadStream(path.join(blobChunkSaveDirPath, chunkName));
                        readStream.on("error", (err) => {
                            return resolve(false);
                        });
                        readStream.on("data", (chunk) => {
                            /// 写入数据，如果流阻塞则先暂停
                            if (writeStream.write(chunk) === false) {
                                readStream.pause();
                            }
                            calcHash.update(chunk);
                        });
                        readStream.on("end", () => {
                            readStream.close();
                            resolve(true);
                        });
                    });
                };
                for (const chunk of chunks) {
                    const resp = await appendChunk(chunk);
                    if (resp === false) {
                        calcHash.digest();
                        return reject(`blob ${hash} append chunk ${chunk} fail`);
                    }
                }
                writeStream.end();
                const hashHex = this.__encode(calcHash.digest());
                if (hashHex === hash) {
                    isSuccess = true;
                    /// 移除分片，关闭逻辑地址
                    try {
                        fs.rmSync(blobChunkSaveDirPath, { recursive: true });
                    } catch (error) {}
                    console.debug(`download blob ${hash} success`);
                    return resolve(hashHex);
                }
                return reject(new Error(`not mathced, expected hash ${hash}, download blob hash ${hashHex}`));
            } catch (err) {
                return reject(err);
            } finally {
                readStream && readStream.close();
                writeStream && writeStream.close();
                this.__openBlobsKV.delete(hash);
                this.__openBlobsVK.delete(pointer);
                if (!isSuccess) {
                    try {
                        if (fs.existsSync(blobTempSavePath)) {
                            fs.unlinkSync(blobTempSavePath);
                        }
                    } catch (error) {}
                }
            }
        });
    }

    changeBlobStrategy(openArg: BFChainCore.OpenBlobArgJSON, strategy: STORAGE_STRATEGY): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const { hash } = openArg;
            /// 正常处理交易把 blob 从临时存储区域移动到永久存储区域
            let sourcePath = this.__getBlobTempSavePath(hash);
            let targetPath = this.__getBlobSavePath(hash);
            if (strategy === STORAGE_STRATEGY.TEMPORARY) {
                /// 区块回滚时把 blob 从永久存储区域移动到临时存储区域
                sourcePath = this.__getBlobSavePath(hash);
                targetPath = this.__getBlobTempSavePath(hash);
            }
            if (!fs.existsSync(sourcePath)) {
                if (fs.existsSync(targetPath)) {
                    return resolve(true);
                }
                return reject(new Error(`blob not exist ${hash}`));
            }
            if (fs.existsSync(targetPath)) {
                return resolve(true);
            }
            // 节省性能，直接走 rename，不走 copy
            fs.rename(sourcePath, targetPath, (err) => {
                if (err) {
                    try {
                        if (fs.existsSync(targetPath)) {
                            fs.unlinkSync(targetPath);
                        }
                    } catch (error) {}
                    return reject(err);
                }
                try {
                    fs.unlinkSync(sourcePath);
                } catch (error) {}
                return resolve(true);
            });
        });
    }
}
