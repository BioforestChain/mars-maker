/// <reference types="socket.io-client" />
import type { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
export declare class WebsocketHelper {
    private __socket;
    private __transactionServerPort;
    private __configHelper;
    private __config;
    readonly REQUEST_PROTOCOL = REQUEST_PROTOCOL.WEBSOCKET;
    readonly URL_PREFIX = "";
    readonly TRANSACTION_SERVER_URL_PREFIX: string;
    constructor(transactionServerPort: number, configHelper: ApiConfigHelper);
    private __getUrl;
    get URL(): string;
    private __getWebsocketHost;
    get WEBSOCKET_HOST(): string;
    createTransaction<T>(url: string, argv: {
        [key: string]: any;
    }): Promise<T>;
    private __init;
    getSocket(): Promise<SocketIOClient.Socket>;
    sendGetRequest<T>(url: string, argv?: {
        [key: string]: any;
    }): Promise<T>;
    sendPostRequest<T>(url: string, argv: {
        [key: string]: any;
    }): Promise<T>;
}
