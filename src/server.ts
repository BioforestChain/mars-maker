import * as url from "node:url";
import * as http from "node:http";
import { EventEmitter } from "node:stream";
import { ModuleStroge, Resolve } from "@bfchain/util";
import { REQUEST_TYPE, parseGetRequestParameter, parsePostRequestParameter, COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { ChainCore } from "./chainCore";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "./exception";
import { Config } from "./config";
import { Logger } from "./logger";
import { INJECT_MODULE } from "./constants";
import { CommonService, MigrateCertificateService, TransactionService, UtilService } from "./services";
import { metadataMap } from "./decorators";

const { ArgumentIllegalException, ArgumentException } = TransactionMakerExceptionGenerator("TransactionMaker", "Server");

const enum EVENT_CMD {
    RESTART = "restart",
}

type QueryArgs =
    | TransactionMaker.Common.CommonParams
    | TransactionMaker.CrossChain.MigrateCertificateArgs
    | TransactionMaker.Transaction.TransactionCommonParams;

export class Server extends EventEmitter {
    private __isRunning = false;

    private __config: Config;
    private __logger: Logger;
    private __chainCore: ChainCore;
    private __moduleMap: ModuleStroge;
    private __routeMap = new Map<TransactionMaker.Server.PATH_NAME_TYPE, (xx: any) => Promise<any>>();

    constructor(configOptions?: TransactionMaker.Server.ConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        super();
        this.__moduleMap = new ModuleStroge();
        this.__config = new Config(configOptions);
        this.__logger = new Logger(this.__config);
        this.__chainCore = new ChainCore(this.__logger, this.__config, genesisBlock);
        this.__moduleMap.set(INJECT_MODULE.CONFIG, this.__config);
        this.__moduleMap.set(INJECT_MODULE.CHAIN_CORE, this.__chainCore);
        this.__moduleMap.set(INJECT_MODULE.CORE, this.__chainCore.bfchainCore);

        this.__registerRoute();

        this.on(EVENT_CMD.RESTART, async () => {
            this.__logger.info(`try to restart server`);
            await this.runServer();
        });
    }

    private __registerRoute() {
        const moduleMap = this.__moduleMap;
        const utilService = Resolve(UtilService, moduleMap);
        const commonService = Resolve(CommonService, moduleMap);
        const transactionService = Resolve(TransactionService, moduleMap);
        const migrateCertificateService = Resolve(MigrateCertificateService, moduleMap);

        const serviceMap = new Map<any, any>([
            [UtilService.prototype, utilService],
            [CommonService.prototype, commonService],
            [TransactionService.prototype, transactionService],
            [MigrateCertificateService.prototype, migrateCertificateService],
        ]);

        const routeMap = this.__routeMap;
        const storages = metadataMap.storages;
        for (const [constructor, storage] of storages.entries()) {
            const service = serviceMap.get(constructor);
            if (service === undefined) {
                throw new ArgumentIllegalException(ERROR_LIST.SERVICE_NOT_FOUND);
            }
            for (const [pathname, handlerName] of storage) {
                routeMap.set(pathname as any, (service as any)[handlerName].bind(service));
            }
        }
    }

    private async __routeCall(pathname: TransactionMaker.Server.PATH_NAME_TYPE, argv: QueryArgs) {
        const handler = this.__routeMap.get(pathname);
        if (handler === undefined) {
            throw new ArgumentIllegalException(ERROR_LIST.API_ENDPOINT_NOT_FOUND, {
                apiPath: pathname,
            });
        }
        return await handler(argv);
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
                const result = await this.__routeCall(pathname, query);
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
                    const result = await this.__routeCall(pathname, body);
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
            this.__routeCall(COMMON_API_PATH.TIME_CORRECTING, {}).catch((err) => {});
        } catch (e: any) {
            this.__logger.error(e);
        }
    }
}
