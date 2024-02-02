import { Injectable } from "@bfchain/util";
import { logger } from "../logger";
import { Sha256BlobReader } from "./sha256BlobReader";
import { Sha256BlobWriter } from "./sha256BlobWriter";
import { BLOB_STORAGE_STRATEGY } from "@bfchain/core";

@Injectable()
export class BlobHelper {
    constructor(private __blobSha256Reader: Sha256BlobReader, private __blobSha256Writer: Sha256BlobWriter) {}
    /**
     * 更改blob存储区域
     * @param blobInfos
     * @param height
     * @returns
     */
    async changeBlobsPath(blobHashArray: string[], height: number) {
        logger.debug(`changeBlobsPath height:${height} blobHashArray:${blobHashArray}`);
        const tasks: (() => Promise<void>)[] = [];
        for (const blobHash of blobHashArray) {
            tasks.push(async () => {
                await this.__blobSha256Writer.changeBlobStrategy(
                    {
                        algorithm: "SHA256",
                        hash: blobHash,
                        downloadSize: 0,
                    },
                    BLOB_STORAGE_STRATEGY.PERSISTENT
                );
            });
        }
        if (tasks.length > 0) {
            let offset = 0;
            while (true) {
                const tempTask = tasks.slice(offset, offset + 3);
                if (tempTask.length === 0) {
                    break;
                }
                await Promise.all(tempTask.map((task) => task()));
                offset += 3;
            }
        }
        return true;
    }
}
