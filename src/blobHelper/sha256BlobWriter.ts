import type { STORAGE_STRATEGY } from "@bfchain/core-helper-blob";
import type { Logger } from "../logger";
import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { BLOBS_SAVE_DIR, BLOBS_TEMPS_SAVE_DIR, BLOBS_CHUNKS_SAVE_DIR, getUUID } from "./constants";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";

const { ArgumentIllegalException } = TransactionMakerExceptionGenerator("TransactionMaker", __filename);

const blobsRootPath = path.join(process.cwd(), BLOBS_SAVE_DIR);
const blobsTempsRootPath = path.join(process.cwd(), BLOBS_TEMPS_SAVE_DIR);
const blobsChunksRootPath = path.join(process.cwd(), BLOBS_CHUNKS_SAVE_DIR);

export class Sha256BlobWriter implements BFChainCore.BlobWriter {
    constructor(private __logger: Logger) {
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
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_ALREADY_EXIST, { hash }));
            }
            const blobSavePath = this.__getBlobSavePath(hash);
            if (fs.existsSync(blobSavePath)) {
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_ALREADY_EXIST, { hash }));
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
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_CHUNK_STORAGE_LOSS_WITH_POINTER, { pointer }));
            }
            const blobChunkSavePath = this.__getBlobChunkSavePath(hash);
            if (!fs.existsSync(blobChunkSavePath)) {
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_CHUNK_STORAGE_LOSS_WITH_HASH, { hash }));
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
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_CHUNK_STORAGE_LOSS_WITH_POINTER, { pointer }));
            }
            /// 分片丢失
            const blobChunkSaveDirPath = this.__getBlobChunkSavePath(hash);
            if (!fs.existsSync(blobChunkSaveDirPath)) {
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_CHUNK_LOSS, { hash }));
            }
            // 这里要按照 index 排序，不然 hash 会计算错误
            const chunks = fs.readdirSync(blobChunkSaveDirPath).sort((a, b) => (Number(a) > Number(b) ? 1 : -1));
            if (chunks.length === 0) {
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_CHUNK_LOSS, { hash }));
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
                    this.__logger.debug(`download blob ${hash} success`);
                    return resolve(hashHex);
                }
                return reject(
                    new ArgumentIllegalException(ERROR_LIST.NOT_MATCH, {
                        to_compare_prop: `hash ${hash}`,
                        to_target: "transaction",
                        be_compare_prop: `hash ${hashHex}`,
                        be_target: "calculate",
                    })
                );
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
                            fs.rmSync(blobTempSavePath, { recursive: true });
                            this.__logger.debug(`saveAsBlob: remove useless blob ${blobTempSavePath}`);
                        }
                    } catch (error) {}
                }
            }
        });
    }

    changeBlobStrategy(openArg: BFChainCore.OpenBlobArgJSON, strategy: STORAGE_STRATEGY): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const { hash } = openArg;
            // /// 正常处理交易把 blob 从临时存储区域移动到永久存储区域
            // let sourcePath = this.__getBlobTempSavePath(hash);
            // let targetPath = this.__getBlobSavePath(hash);
            // if (strategy === STORAGE_STRATEGY.TEMPORARY) {
            //     /// 区块回滚时把 blob 从永久存储区域移动到临时存储区域
            //     sourcePath = this.__getBlobSavePath(hash);
            //     targetPath = this.__getBlobTempSavePath(hash);
            // }
            /// blob 可以重复上链，所以这里只能从 临时区 移动到 永久区，无法知道之前是否有交易已经对他做了上链操作
            /// 这就会导致 blob 里面可能存在大量无效的 blob
            /// 直接从 永久区 移动到 临时区 存在极大的 blob 丢失风险，除非做上链次数统计，这个统计非常麻烦
            const sourcePath = this.__getBlobTempSavePath(hash);
            const targetPath = this.__getBlobSavePath(hash);
            if (!fs.existsSync(sourcePath)) {
                if (fs.existsSync(targetPath)) {
                    return resolve(true);
                }
                return reject(new ArgumentIllegalException(ERROR_LIST.BLOB_NOT_EXIST, { hash }));
            }
            if (fs.existsSync(targetPath)) {
                return resolve(true);
            }
            // 节省性能，直接走 rename，不走 copy
            fs.rename(sourcePath, targetPath, (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
}
