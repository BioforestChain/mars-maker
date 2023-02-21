import { Api } from "@bfchain/pc-sdk-api";
export declare class Sdk {
    private __transactionServer;
    private __transactionServerPort;
    private __api;
    private __configOptions;
    constructor(configOptions?: BFMetaPcSdk.ConfigOptions);
    get api(): Api;
    setApiConfig(configOptions: BFMetaPcSdk.ApiConfigOptions): void;
    correctTransactionServerTime(timeOffset: number): void;
    runTransactionServer(configOptions?: BFMetaPcSdk.TransactionConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON): Promise<void>;
}
