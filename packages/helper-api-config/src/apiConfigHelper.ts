import * as fs from "fs";
import { Injectable } from "@bfchain/util-dep-inject";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";

const CONFIG_ROOT_PATH = process.cwd() + "/config";

@Injectable()
export class ApiConfigHelper {
    private __apiConfig!: BFChainPcSdk.ApiConfig;

    constructor(configOptions?: BFChainPcSdk.ApiConfigOptions) {
        this.__initConfig();
        configOptions && this.setApiConfig(configOptions);
    }

    private __initConfig() {
        this.__apiConfig = {
            ip: "127.0.0.1",
            port: 9003,
            requestTimeOut: 10000,
            requestProtocol: REQUEST_PROTOCOL.WEBSOCKET,
        };

        const configPath = `${CONFIG_ROOT_PATH}/config.json`;
        if (fs.existsSync(configPath)) {
            const configData: {
                apiConfig: BFChainPcSdk.ApiConfigOptions;
                transactionServerPort: number;
            } = JSON.parse(fs.readFileSync(configPath).toString());
            if (configData.apiConfig) {
                this.setApiConfig(configData.apiConfig);
            }
        }
    }

    setApiConfig(apiConfigOptions: BFChainPcSdk.ApiConfigOptions) {
        if (!this.__apiConfig) {
            this.__initConfig();
        }
        const { ip, port, requestTimeOut, requestProtocol } = apiConfigOptions;
        ip !== undefined && (this.__apiConfig.ip = ip);
        port !== undefined && (this.__apiConfig.port = port);
        requestTimeOut !== undefined && (this.__apiConfig.requestTimeOut = requestTimeOut);
        requestProtocol !== undefined && (this.__apiConfig.requestProtocol = requestProtocol);
    }

    get apiConfig() {
        if (!this.__apiConfig) {
            this.__initConfig();
        }
        return this.__apiConfig;
    }
}
