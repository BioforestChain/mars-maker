import type { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";
import * as http from "http";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
import { parsePostRequestParameter } from "@bfchain/pc-sdk-helper-request-parameter-parser";

export class HttpHelper {
    constructor(private __transactionServerPort: number, private __configHelper: ApiConfigHelper) {}

    private __config = this.__configHelper.apiConfig;
    // FIXME: 兼容老燕辉设计的神奇的 api
    public readonly REQUEST_PROTOCOL = REQUEST_PROTOCOL.HTTP;
    public readonly URL_PREFIX = `http://${this.__config.ip}:${this.__config.port}/`;
    public readonly TRANSACTION_SERVER_URL_PREFIX = `http://127.0.0.1:${this.__transactionServerPort}`;

    createTransaction<T>(url: string, argv: { [key: string]: any }) {
        return new Promise<T>((resolve, reject) => {
            const req = http.request(url, { method: "POST", headers: { "content-type": "application/json" } }, async (res) => {
                const body = await parsePostRequestParameter(res);
                return resolve(body as any);
            });
            req.setTimeout(this.__config.requestTimeOut, () => {
                return reject("timeout");
            });
            req.on("error", (e) => {
                return reject(e);
            });
            req.write(JSON.stringify(argv));
            req.end();
        });
    }

    sendGetRequest<T>(url: string, argv?: { [key: string]: any }) {
        const completeUrl = url + (argv ? `?${JSON.stringify(argv)}` : "");
        return new Promise<T>((resolve, reject) => {
            const req = http.get(completeUrl, async (res) => {
                const body = await parsePostRequestParameter(res);
                return resolve(body as any);
            });
            req.setTimeout(this.__config.requestTimeOut, () => {
                return reject("timeout");
            });
            req.on("error", (e) => {
                return reject(e);
            });
        });
    }

    sendPostRequest = this.createTransaction;
}
