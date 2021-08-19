import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import * as http from "http";
import { Router, route } from "./router";
import { REQUEST_TYPE } from "./constants";
import { GENERATE_TRANSACTION_API_PATH, MyBaseHelper } from "@bfchain/pc-sdk-transactions";
import { parseGetRequestParameter, parsePostRequestParameter } from "@bfchain/pc-sdk-helper-request-parameter-parser";
import {
    SdkExceptionGenerator,
    UNKNOWN_REQUEST_TYPE,
    REQUEST_URL_IS_REQUIRED,
    REQUEST_METHOD_IS_REQUIRED,
    REQUEST_PARAMETER_ONLY_CAN_BE_JSON,
} from "@bfchain/pc-sdk-exception";
const { ArgumentIllegalException, ArgumentException } = SdkExceptionGenerator("Sdk", "Transactions-Server");

const hasBody = (request: http.IncomingMessage) => "transfer-encoding" in request.headers || "content-length" in request.headers;
const isJson = (request: http.IncomingMessage) => request.headers["content-type"] === "application/json";

const onRequest = async (request: http.IncomingMessage, response: http.ServerResponse) => {
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
        const pathname = url.parse(request.url).pathname as unknown as BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH | null;
        if (!pathname) {
            throw new ArgumentException(REQUEST_URL_IS_REQUIRED, {
                ...exception,
            });
        }
        if (method === REQUEST_TYPE.GET) {
            const query = (await parseGetRequestParameter(request)) as unknown as BFChainPcSdk.Transaction.TransactionCommonParams;
            const result = await route({ pathname, params: query });
            response.end(
                JSON.stringify({
                    success: true,
                    result,
                })
            );
            return;
        }
        if (method === REQUEST_TYPE.POST) {
            if (hasBody(request)) {
                if (!isJson(request)) {
                    throw new ArgumentException(REQUEST_PARAMETER_ONLY_CAN_BE_JSON, {
                        ...exception,
                    });
                }
                const body = (await parsePostRequestParameter(request)) as unknown as BFChainPcSdk.Transaction.TransactionCommonParams;
                const result = await route({ pathname, params: body });
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
    } catch (e) {
        const errorInfo: BFChainPcSdk.TransactionServer.GenerateTransactionFailureReturn = {
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
};

export const getTransactionServerPort = (configRootPath?: string) => {
    const configPath = path.join(configRootPath || path.join(process.cwd(), "config"), "config.json");
    if (fs.existsSync(configPath)) {
        const config: {
            transactionServerPort: number;
        } = JSON.parse(fs.readFileSync(configPath).toString());
        if (config && config.transactionServerPort !== undefined) {
            return config.transactionServerPort;
        }
    }
    return 8888;
};

export async function runTransactionServer(port?: number, configOptions: BFChainPcSdk.TransactionConfigOptions = {}) {
    try {
        if (!configOptions) {
            configOptions = {};
        }
        const myBaseHelper = new MyBaseHelper(configOptions);
        if (port === undefined) {
            port = getTransactionServerPort(configOptions.configRootPath);
        }
        Router(myBaseHelper.bfchainCore);
        const server = http.createServer(onRequest);
        server.on("error", (e) => {
            console.error(e);
        });
        server.listen(port);
        console.debug(`transaction server running with port ${port}`);
    } catch (e) {
        console.error(e);
    }
}
