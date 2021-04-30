import { Api } from "@bfchain/pc-sdk-api";
import { getTransactionServerPort, runTransactionServer } from "@bfchain/pc-sdk-transactions-server";

export class Sdk {
    private __transactionServerPort = getTransactionServerPort();
    private __api: Api;
    constructor(configOptions?: BFChainPcSdk.ConfigOptions) {
        if (configOptions) {
            if (configOptions.transactionServerPort !== undefined) {
                this.__transactionServerPort = configOptions.transactionServerPort;
            }
        } else {
            configOptions = {};
        }
        this.__api = new Api(this.__transactionServerPort, configOptions.apiConfig);
    }

    get api() {
        return this.__api;
    }

    async runTransactionServer(configOptions?: BFChainPcSdk.TransactionConfigOptions) {
        await runTransactionServer(this.__transactionServerPort, configOptions);
    }
}
