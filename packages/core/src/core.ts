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
        this.__api = new Api(this.__transactionServerPort, this.__configOptions.apiConfig);
    }

    get api() {
        return this.__api;
    }

    async runTransactionServer(configOptions = this.__configOptions.transactionConfig) {
        await runTransactionServer(this.__transactionServerPort, configOptions);
    }
}
