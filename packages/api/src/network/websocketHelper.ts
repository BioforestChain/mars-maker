import type { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";
import * as http from "http";
import * as io from "socket.io-client";
import { maxOneFileSize, REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
import { parsePostRequestParameter } from "@bfchain/pc-sdk-helper-request-parameter-parser";

export class WebsocketHelper {
    private __socket!: SocketIOClient.Socket;
    private __transactionServerPort: number;
    private __configHelper: ApiConfigHelper;
    private __config: BFChainPcSdk.ApiConfig;

    private readonly __URL: string;
    private readonly __WEBSOCKET_HOST: string;

    // FIXME: 兼容老燕辉设计的神奇的 api
    public readonly REQUEST_PROTOCOL = REQUEST_PROTOCOL.WEBSOCKET;
    public readonly URL_PREFIX = ``;
    public readonly TRANSACTION_SERVER_URL_PREFIX: string;

    constructor(transactionServerPort: number, configHelper: ApiConfigHelper) {
        this.__transactionServerPort = transactionServerPort;
        this.__configHelper = configHelper;
        this.__config = this.__configHelper.apiConfig;

        this.__URL = `http://${this.__config.ip}:${this.__config.port}`;
        this.__WEBSOCKET_HOST = `${this.__URL}/systemChannel`;

        this.TRANSACTION_SERVER_URL_PREFIX = `http://127.0.0.1:${this.__transactionServerPort}`;
    }

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

    private __init() {
        return new Promise<SocketIOClient.Socket>((resolve, reject) => {
            const socket = io.connect(this.__WEBSOCKET_HOST, {
                transports: ["websocket"],
                timeout: this.__config.requestTimeOut,
                transportOptions: {
                    websocket: {
                        maxPayload: maxOneFileSize,
                    },
                },
            });
            socket.on("connect", () => {
                console.debug(`connected to ${this.__URL} `);
                this.__socket = socket;
                return resolve(socket);
            });
            socket.on("connect_error", (data: any) => {
                return reject(new Error(`${this.__URL} connect_error`));
            });
            socket.on("connect_timeout", (data: any) => {
                return reject(new Error(`${this.__URL} connect_timeout`));
            });
            socket.on("reconnect_attempt", (data: any) => {
                return reject(new Error(`${this.__URL} reconnect_attempt`));
            });
            socket.on("reconnect_error", (data: any) => {
                return reject(new Error(`${this.__URL} reconnect_error`));
            });
            socket.on("error", (data: any) => {
                return reject(new Error(`${this.__URL} error with`));
            });
            socket.on("close", (data: any) => {
                return reject(new Error(`${this.__URL} close with`));
            });
            socket.on("disconnect", () => {
                return reject(new Error(`${this.__URL} disconnected `));
            });
        });
    }

    async getSocket() {
        if (!this.__socket) {
            await this.__init();
        }
        return this.__socket;
    }

    async sendGetRequest<T>(url: string, argv?: { [key: string]: any }) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const socket = await this.getSocket();
                socket.emit(url, argv, (result: BFChainPcSdk.ApiReturn) => {
                    return resolve(result as any);
                });
            } catch (e) {
                return reject(e);
            }
        });
    }

    async sendPostRequest<T>(url: string, argv: { [key: string]: any }) {
        return new Promise<T>(async (resolve, reject) => {
            try {
                const socket = await this.getSocket();
                socket.emit(url, argv, (result: BFChainPcSdk.ApiReturn) => {
                    return resolve(result as any);
                });
            } catch (e) {
                return reject(e);
            }
        });
    }
}
