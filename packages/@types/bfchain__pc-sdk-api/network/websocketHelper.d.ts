/// <reference types="socket.io-client" />
import type { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
export declare class WebsocketHelper {
    private __transactionServerPort;
    private __configHelper;
    private __socket;
    private __config;
    private readonly __URL;
    private readonly __WEBSOCKET_HOST;
    readonly REQUEST_PROTOCOL = REQUEST_PROTOCOL.WEBSOCKET;
    readonly URL_PREFIX = "";
    readonly TRANSACTION_SERVER_URL_PREFIX: string;
    constructor(__transactionServerPort: number, __configHelper: ApiConfigHelper);
    createTransaction<T>(
        url: string,
        argv: {
            [key: string]: any;
        }
    ): Promise<T>;
    private __init;
    getSocket(): Promise<SocketIOClient.Socket>;
    sendGetRequest<T>(
        url: string,
        argv?: {
            [key: string]: any;
        }
    ): Promise<T>;
    sendPostRequest<T>(
        url: string,
        argv: {
            [key: string]: any;
        }
    ): Promise<T>;
}
