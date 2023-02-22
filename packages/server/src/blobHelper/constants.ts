/**blob 存储文件夹 */
export const BLOBS_SAVE_DIR = "blobs";

/**blob 分片存储文件夹 */
export const BLOBS_CHUNKS_SAVE_DIR = "blobs_chunks";

/**blob 临时存储文件夹 */
export const BLOBS_TEMPS_SAVE_DIR = "blobs_temps";

/**blob 打开最长时间 10 分钟 */
export const BLOB_MAX_OPEN_TIMES = 10 * 60 * 1000;

/**blob chunk 最大保留时间 10 分钟 */
export const BLOB_CHUNK_EFFECTIVE_TIMES = 10 * 60 * 1000;

/**blob temp 最大保留时间 1 个月 */
export const BLOB_TEMP_EFFECTIVE_TIMES = 30 * 24 * 60 * 60 * 1000;

export function getUUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

/**
 * 判断是否为空对象
 * @param {*} e
 */
export function isEmptyObject(e: any) {
    if (Object.prototype.toString.call(e) !== "[object Object]") return false;
    for (const t in e) return false;
    return true;
}
