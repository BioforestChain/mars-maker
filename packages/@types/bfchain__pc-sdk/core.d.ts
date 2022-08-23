import { Api } from "@bfchain/pc-sdk-api";
export declare class Sdk {
    private __transactionServer;
    private __transactionServerPort;
    private __api;
    private __configOptions;
    constructor(configOptions?: BFChainPcSdk.ConfigOptions);
    get api(): Api;
    setApiConfig(configOptions: BFChainPcSdk.ApiConfigOptions): void;
    correctTransactionServerTime(timeOffset: number): void;
    runTransactionServer(configOptions?: BFChainPcSdk.TransactionConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON): Promise<void>;
}
