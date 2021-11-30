import type { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
export declare class HttpHelper {
    private __transactionServerPort;
    private __configHelper;
    private __config;
    readonly REQUEST_PROTOCOL = REQUEST_PROTOCOL.HTTP;
    readonly URL_PREFIX: string;
    readonly TRANSACTION_SERVER_URL_PREFIX: string;
    constructor(transactionServerPort: number, configHelper: ApiConfigHelper);
    createTransaction<T>(url: string, argv: {
        [key: string]: any;
    }): Promise<T>;
    sendGetRequest<T>(url: string, argv?: {
        [key: string]: any;
    }): Promise<T>;
    sendPostRequest: <T>(url: string, argv: {
        [key: string]: any;
    }) => Promise<T>;
}
