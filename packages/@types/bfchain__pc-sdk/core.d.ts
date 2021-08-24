import { Api } from "@bfchain/pc-sdk-api";
export declare class Sdk {
    private __transactionServerPort;
    private __api;
    private __configOptions;
    constructor(configOptions?: BFChainPcSdk.ConfigOptions);
    get api(): Api;
    setApiConfig(configOptions: BFChainPcSdk.ApiConfigOptions): void;
    runTransactionServer(configOptions?: BFChainPcSdk.TransactionConfigOptions): Promise<void>;
}
