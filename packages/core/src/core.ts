import { Api } from "@bfchain/pc-sdk-api";
import { getTransactionServerPort, runTransactionServer } from "@bfchain/pc-sdk-transactions-server";

export class Sdk {
    private __transactionServerPort = getTransactionServerPort();
    private __api: Api;
    private __configOptions: BFChainPcSdk.ConfigOptions = {};
    constructor(configOptions?: BFChainPcSdk.ConfigOptions) {
        if (configOptions) {
            if (configOptions.transactionServerPort !== undefined) {
                this.__transactionServerPort = configOptions.transactionServerPort;
            }
            this.__configOptions = configOptions;
        }
        const configRootPath = this.__configOptions.configRootPath;
        const apiConfig = this.__configOptions.apiConfig;
        this.__api = new Api(
            this.__transactionServerPort,
            configRootPath
                ? apiConfig
                    ? {
                          ...apiConfig,
                          configRootPath,
                      }
                    : {
                          configRootPath,
                      }
                : apiConfig
        );
    }

    get api() {
        return this.__api;
    }

    async runTransactionServer(configOptions?: BFChainPcSdk.TransactionConfigOptions) {
        configOptions = configOptions || {};
        if (this.__configOptions.configRootPath) {
            configOptions.configRootPath = this.__configOptions.configRootPath;
        }
        await runTransactionServer(this.__transactionServerPort, configOptions);
    }
}
