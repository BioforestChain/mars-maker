import * as url from "node:url";
import * as http from "node:http";
import { EventEmitter } from "node:stream";
import { Aborter, sleep, I18N_LANGUAGE_TYPE } from "@bfchain/util";
import { RESPONSE_STATUS, NewTransactionStatus } from "@bfchain/core";
import { REQUEST_TYPE, parseGetRequestParameter, parsePostRequestParameter, UTIL_API_PATH, COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { Router, route } from "./router";
import { ChainCore } from "./chainCore";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "./exception";
import { Config } from "./config";
import { Logger } from "./logger";
import { UtilFactory } from "./atom_transaction/utilFactory";

const { ArgumentIllegalException, ArgumentException } = TransactionMakerExceptionGenerator("TransactionMaker", "Server");

const enum EVENT_CMD {
    RESTART = "restart",
}

export class Server extends EventEmitter {
    private __isRunning = false;

    private __config: Config;
    private __logger: Logger;
    private __chainCore: ChainCore;
    private __util: UtilFactory;

    constructor(configOptions?: TransactionMaker.Server.ConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        super();
        this.__config = new Config(configOptions);
        this.__logger = new Logger(this.__config);
        this.__chainCore = new ChainCore(this.__logger, this.__config, genesisBlock);
        this.__util = new UtilFactory(this.__config, this.__chainCore);

        this.on(EVENT_CMD.RESTART, async () => {
            this.__logger.info(`try to restart server`);
            await this.runServer();
        });
    }

    private __hasBody(request: http.IncomingMessage) {
        return "transfer-encoding" in request.headers || "content-length" in request.headers;
    }
    private __isJson(request: http.IncomingMessage) {
        return request.headers["content-type"] === "application/json";
    }

    private async __onRequest(request: http.IncomingMessage, response: http.ServerResponse) {
        const exception = {
            target: "request",
        };
        response.setHeader("content-type", "application/json");
        response.on("error", (e) => {
            this.__logger.error(e);
        });
        try {
            const method = request.method;
            if (!method) {
                throw new ArgumentException(ERROR_LIST.REQUEST_METHOD_IS_REQUIRED, {
                    ...exception,
                });
            }
            if (!request.url) {
                throw new ArgumentException(ERROR_LIST.REQUEST_URL_IS_REQUIRED, {
                    ...exception,
                });
            }
            const pathname = url.parse(request.url).pathname as unknown as TransactionMaker.Transaction.GENERATE_TRANSACTION_API_PATH | null;
            if (!pathname) {
                throw new ArgumentException(ERROR_LIST.REQUEST_URL_IS_REQUIRED, {
                    ...exception,
                });
            }
            if (method.toUpperCase() === REQUEST_TYPE.GET) {
                const query = (await parseGetRequestParameter(request)) as unknown as TransactionMaker.Transaction.TransactionCommonParams;
                const result = await route({ pathname, params: query }, this.__chainCore.bfchainCore);
                response.end(
                    JSON.stringify({
                        success: true,
                        result,
                    })
                );
                return;
            }
            if (method.toUpperCase() === REQUEST_TYPE.POST) {
                if (this.__hasBody(request)) {
                    if (!this.__isJson(request)) {
                        throw new ArgumentException(ERROR_LIST.REQUEST_PARAMETER_ONLY_CAN_BE_JSON, {
                            ...exception,
                        });
                    }
                    const body = (await parsePostRequestParameter(request)) as unknown as TransactionMaker.Transaction.TransactionCommonParams;
                    // 时间校正
                    if ((pathname as any) === COMMON_API_PATH.TIME_CORRECTING) {
                        const result = await this.timeCorrecting(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    // 获取节点可能的最新区块高度
                    if ((pathname as any) === COMMON_API_PATH.MAYBE_HEIGHT) {
                        const result = await this.getMaybeHeight(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    // 广播交易
                    if ((pathname as any) === UTIL_API_PATH.BROADCAST) {
                        const result = await this.__util.broadcastTransaction(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    // 重组交易
                    if ((pathname as any) === UTIL_API_PATH.RECOMBINE) {
                        const result = await this.__util.recombineTransaction(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    // 宏编译
                    if ((pathname as any) === UTIL_API_PATH.MACRO_BUILD) {
                        const result = await this.__util.macroBuildTransaction(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    const result = await route({ pathname, params: body }, this.__chainCore.bfchainCore);
                    response.end(
                        JSON.stringify({
                            success: true,
                            result,
                        })
                    );
                    return;
                }
            }
            throw new ArgumentIllegalException(ERROR_LIST.UNKNOWN_REQUEST_TYPE, {
                ...exception,
                requestType: method,
            });
        } catch (e: any) {
            this.__logger.error(e);
            const errorInfo: TransactionMaker.Server.GenerateTransactionFailureReturn = {
                success: false,
                error: {
                    code: e.CODE === undefined ? 7001 : e.CODE,
                    message: e.message,
                },
            };
            response.end(JSON.stringify(errorInfo));
        }
    }

    private async __getPeerInfo(ip?: string) {
        const { chainNodeIps, broadcastTimeout } = this.__config.config;
        const nodeIp = ip || chainNodeIps[Math.floor(Math.random() * chainNodeIps.length)];
        const bfchainCore = this.__chainCore.bfchainCore;
        const port = bfchainCore.config.ports.port;
        const url = this.__chainCore.getUrl(nodeIp, port, bfchainCore);
        const aborter = new Aborter();
        setTimeout(() => {
            aborter.abort(`timeCorrecting timeout ${nodeIp}`);
        }, broadcastTimeout);
        const duplexHandler = await this.__chainCore.getDuplexHandler(url, aborter, broadcastTimeout, bfchainCore);
        await sleep(1000);

        const peerInfo = await duplexHandler.forceDuplexca().requestPeerScan();
        if (!peerInfo) {
            throw new Error(`Failed to get peerInfo ${ip}`);
        }
        if (peerInfo.localInfo.extendsInfoPackage.chainChannel) {
            return {
                timestamp: peerInfo.localInfo.extendsInfoPackage.chainChannel.timestamp,
                maybeHeight: peerInfo.localInfo.extendsInfoPackage.chainChannel.height,
            };
        }
        return {
            timestamp: 0,
            maybeHeight: 1,
        };
    }

    async getMaybeHeight(argv: TransactionMaker.Common.MaybeHeightParams) {
        const peerInfo = await this.__getPeerInfo(argv.ip);
        return peerInfo.maybeHeight;
    }

    async timeCorrecting(argv: TransactionMaker.Common.TimeCorrectingParams) {
        const peerInfo = await this.__getPeerInfo(argv.ip);
        const bfchainCore = this.__chainCore.bfchainCore;
        const peerTime = bfchainCore.time.getTimeByTimestamp(peerInfo.timestamp);
        const curTime = bfchainCore.time.now();
        const diff = peerTime - curTime;
        bfchainCore.time.time_offset_ms += diff;
        return bfchainCore.time.now();
    }

    /**
     * 运行服务器
     *
     * @param port
     * @returns
     */
    async runServer(port?: number) {
        if (this.__isRunning) {
            this.__logger.info(`server already running`);
            return;
        }
        this.__isRunning = true;
        try {
            if (port === undefined) {
                port = this.__config.config.port;
            } else {
                this.__config.setConfig({ port });
            }
            Router(this.__chainCore.bfchainCore);
            const server = http.createServer(this.__onRequest.bind(this));
            server.on("error", (e) => {
                this.__logger.error(e);
            });
            server.on("close", () => {
                this.__isRunning = false;
                this.emit(EVENT_CMD.RESTART);
            });
            server.listen(port);
            this.__logger.info(`server running with port ${port}`);
            this.timeCorrecting({}).catch((err) => {});
        } catch (e: any) {
            this.__logger.error(e);
        }
    }
}
