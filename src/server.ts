import * as url from "node:url";
import * as http from "node:http";
import { Aborter, sleep, I18N_LANGUAGE_TYPE } from "@bfchain/util";
import { RESPONSE_STATUS, NewTransactionStatus } from "@bfchain/core";
import {
    REQUEST_TYPE,
    parseGetRequestParameter,
    parsePostRequestParameter,
    BROADCAST_TRANSACTION_API_PATH,
    COMMON_API_PATH,
} from "@bfmeta/transaction-maker-core";
import { Router, route } from "./router";
import { ChainCore } from "./chainCore";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "./exception";
import { Config } from "./config";
import { EventEmitter } from "node:stream";
const { ArgumentIllegalException, ArgumentException } = TransactionMakerExceptionGenerator("TransactionMaker", "Server");

const enum EVENT_CMD {
    RESTART = "restart",
}

export class Server extends EventEmitter {
    private __isRunning = false;

    private __config: Config;
    private __chainCore: ChainCore;

    constructor(configOptions: TransactionMaker.Server.ConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        super();
        this.__config = new Config(configOptions);
        this.__chainCore = new ChainCore(this.__config, genesisBlock);

        this.on(EVENT_CMD.RESTART, async () => {
            console.log(`try to restart server`);
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
            console.error(e);
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
                    if ((pathname as any) === COMMON_API_PATH.TIME_CORRECTING_API_PATH) {
                        const result = await this.timeCorrecting(body as any);
                        response.end(
                            JSON.stringify({
                                success: true,
                                result,
                            })
                        );
                        return;
                    }
                    // 广播交易
                    if ((pathname as any) === BROADCAST_TRANSACTION_API_PATH) {
                        const result = await this.broadcastTransaction(body as any);
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
            const errorInfo: TransactionMaker.Server.GenerateTransactionFailureReturn = {
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

    private __getStatus(status: RESPONSE_STATUS) {
        const SYSTEM_LANGUAGE = this.__chainCore.SYSTEM_LANGUAGE;
        if (SYSTEM_LANGUAGE === I18N_LANGUAGE_TYPE.CHINESE) {
            if (status === RESPONSE_STATUS.error) {
                return "错误";
            }
            if (status === RESPONSE_STATUS.busy) {
                return "节点繁忙";
            }
            if (status === RESPONSE_STATUS.idempotentError) {
                return "幂等错误";
            }
            if (status === RESPONSE_STATUS.success) {
                return "成功";
            }
            return "未知状态";
        }
        if (status === RESPONSE_STATUS.error) {
            return "error";
        }
        if (status === RESPONSE_STATUS.busy) {
            return "busy";
        }
        if (status === RESPONSE_STATUS.idempotentError) {
            return "idempotent error ";
        }
        if (status === RESPONSE_STATUS.success) {
            return "success";
        }
        return "unknown";
    }

    private __getNewTrsStatus(newTrsStatus: NewTransactionStatus) {
        const SYSTEM_LANGUAGE = this.__chainCore.SYSTEM_LANGUAGE;
        if (SYSTEM_LANGUAGE === I18N_LANGUAGE_TYPE.CHINESE) {
            if (newTrsStatus === NewTransactionStatus.InBlock) {
                return "已上链";
            }
            if (newTrsStatus === NewTransactionStatus.InUnconfirmQuene) {
                return "已在未处理交易池";
            }
            if (newTrsStatus === NewTransactionStatus.Refuse) {
                return "拒绝接收，可能是队列已经满";
            }
            return "未知状态";
        }
        if (newTrsStatus === NewTransactionStatus.InBlock) {
            return "in block";
        }
        if (newTrsStatus === NewTransactionStatus.InUnconfirmQuene) {
            return "in unconfirm quene";
        }
        if (newTrsStatus === NewTransactionStatus.Refuse) {
            return "refuse, maybe unconfirm quene full";
        }
        return "unknown";
    }

    async broadcastTransaction(argv: TransactionMaker.Transaction.BroadcastTransactionParams) {
        if (!argv.transaction) {
            throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_REQUIRE, {
                prop: "transaction",
                target: "request",
            });
        }
        const { transaction, ip } = argv;
        const { chainNodeIps, broadcastTimeout } = this.__config.config;
        const bfchainCore = this.__chainCore.bfchainCore;
        const port = bfchainCore.config.ports.port;
        const url = this.__chainCore.getUrl(ip || chainNodeIps[Math.floor(Math.random() * chainNodeIps.length)], port, bfchainCore);
        const aborter = new Aborter();
        setTimeout(() => {
            aborter.abort(`broadcastTransaction ${transaction.signature} timeout`);
        }, broadcastTimeout);
        const duplexHandler = await this.__chainCore.getDuplexHandler(url, aborter, broadcastTimeout, bfchainCore);
        await sleep(1000);
        const resp = await aborter.wrapAsync(duplexHandler.broadcastTransaction(transaction));
        resp.toJSON();
        const result: TransactionMaker.Server.BroadcastTransactionResponse = {
            status: this.__getStatus(resp.status),
            newTrsStatus: this.__getNewTrsStatus(resp.newTrsStatus),
            minFee: resp.minFee,
        };
        resp.errorCode !== undefined && (result.errorCode = resp.errorCode);
        resp.refuseReason !== undefined && (result.refuseReason = resp.refuseReason as any);
        return result;
    }

    async timeCorrecting(ip?: string) {
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
        const timestamp = peerInfo.localInfo.extendsInfoPackage.chainChannel ? peerInfo.localInfo.extendsInfoPackage.chainChannel.timestamp : 0;
        const peerTime = bfchainCore.time.getTimeByTimestamp(timestamp);
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
            console.debug(`server already running`);
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
                console.error(e);
            });
            server.on("close", () => {
                this.__isRunning = false;
                this.emit(EVENT_CMD.RESTART);
            });
            server.listen(port);
            console.debug(`server running with port ${port}`);
            this.timeCorrecting().catch((err) => {});
        } catch (e: any) {
            console.error(e);
        }
    }
}
