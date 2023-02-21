import type { BFChainCore } from "@bfchain/core";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import * as http from "http";
import { Router, route } from "./router";
import { REQUEST_TYPE } from "./constants";
import { MyBaseHelper } from "@bfchain/pc-sdk-transactions";
import { parseGetRequestParameter, parsePostRequestParameter } from "@bfchain/pc-sdk-helper-request-parameter-parser";
import {
    SdkExceptionGenerator,
    UNKNOWN_REQUEST_TYPE,
    REQUEST_URL_IS_REQUIRED,
    REQUEST_METHOD_IS_REQUIRED,
    REQUEST_PARAMETER_ONLY_CAN_BE_JSON,
} from "@bfchain/pc-sdk-exception";
const { ArgumentIllegalException, ArgumentException } = SdkExceptionGenerator("Sdk", "Transactions-Server");

export class TransactionServer {
    private __isRunning = false;

    private __bfchainCore!: BFChainCore;

    private __port!: number;

    private __hasBody(request: http.IncomingMessage) {
        return "transfer-encoding" in request.headers || "content-length" in request.headers;
    }
    private __isJson(request: http.IncomingMessage) {
        return request.headers["content-type"] === "application/json";
    }

    private async __onRequest(request: http.IncomingMessage, response: http.ServerResponse) {
        const exception = {
            target: "request",
            function: "onRequest",
        };
        response.setHeader("content-type", "application/json");
        response.on("error", (e) => {
            console.error(e);
        });
        try {
            const method = request.method;
            if (!method) {
                throw new ArgumentException(REQUEST_METHOD_IS_REQUIRED, {
                    ...exception,
                });
            }
            if (!request.url) {
                throw new ArgumentException(REQUEST_URL_IS_REQUIRED, {
                    ...exception,
                });
            }
            const pathname = url.parse(request.url).pathname as unknown as BFMetaPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH | null;
            if (!pathname) {
                throw new ArgumentException(REQUEST_URL_IS_REQUIRED, {
                    ...exception,
                });
            }
            if (method === REQUEST_TYPE.GET) {
                const query = (await parseGetRequestParameter(request)) as unknown as BFMetaPcSdk.Transaction.TransactionCommonParams;
                const result = await route({ pathname, params: query }, this.__bfchainCore);
                response.end(
                    JSON.stringify({
                        success: true,
                        result,
                    })
                );
                return;
            }
            if (method === REQUEST_TYPE.POST) {
                if (this.__hasBody(request)) {
                    if (!this.__isJson(request)) {
                        throw new ArgumentException(REQUEST_PARAMETER_ONLY_CAN_BE_JSON, {
                            ...exception,
                        });
                    }
                    const body = (await parsePostRequestParameter(request)) as unknown as BFMetaPcSdk.Transaction.TransactionCommonParams;
                    const result = await route({ pathname, params: body }, this.__bfchainCore);
                    response.end(
                        JSON.stringify({
                            success: true,
                            result,
                        })
                    );
                    return;
                }
            }
            throw new ArgumentIllegalException(UNKNOWN_REQUEST_TYPE, {
                ...exception,
                description: "only support response GET or POST",
            });
        } catch (e: any) {
            const errorInfo: BFMetaPcSdk.TransactionServer.GenerateTransactionFailureReturn = {
                success: false,
                error: {
                    code: e.CODE === undefined ? 7001 : e.CODE,
                    message: e.message,
                },
            };
            if (e.detail && e.detail.description) {
                errorInfo.error.description = e.detail.description;
            }
            response.end(JSON.stringify(errorInfo));
        }
    }

    /**
     * 获取交易服务器监听的端口号
     *
     * @param configRootPath
     * @returns
     */
    getTransactionServerPort(configRootPath?: string) {
        if (this.__port === undefined) {
            const configPath = path.join(configRootPath || path.join(process.cwd(), "config"), "config.json");
            if (fs.existsSync(configPath)) {
                const config: {
                    transactionServerPort: number;
                } = JSON.parse(fs.readFileSync(configPath).toString());
                if (config && config.transactionServerPort !== undefined) {
                    this.__port = config.transactionServerPort;
                }
            } else {
                this.__port = 8888;
            }
        }
        return this.__port;
    }

    /**
     * 时间校正
     *
     * @param timeOffset 偏移量 ms
     */
    timeCorrecting(timeOffset: number) {
        if (!this.__bfchainCore) {
            throw new Error(`run transaction server at first, please`);
        }
        this.__bfchainCore.time.time_offset_ms += timeOffset;
    }

    /**
     * 运行服务器
     *
     * @param port
     * @param configOptions
     * @returns
     */
    async runTransactionServer(port?: number, configOptions: BFMetaPcSdk.TransactionConfigOptions = {}, genesisBlockJson?: BFChainCore.GenesisBlockJSON) {
        if (this.__isRunning) {
            console.debug(`transaction server already running`);
            return;
        }
        this.__isRunning = true;
        try {
            if (!configOptions) {
                configOptions = {};
            }
            const myBaseHelper = new MyBaseHelper(configOptions, genesisBlockJson);
            if (port === undefined) {
                port = this.getTransactionServerPort(configOptions.configRootPath);
            }
            this.__port = port;
            this.__bfchainCore = myBaseHelper.bfchainCore;
            Router(this.__bfchainCore);
            const server = http.createServer(this.__onRequest.bind(this));
            server.on("error", (e) => {
                console.error(e);
            });
            server.listen(this.__port);
            console.debug(`transaction server running with port ${this.__port}`);
        } catch (e) {
            console.error(e);
        }
    }
}
