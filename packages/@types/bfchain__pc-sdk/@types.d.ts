declare namespace BFChainPcSdk {
    interface Config {
        configRootPath?: string;
        genesisBlockRootPath?: string;
        apiConfig: ApiConfig;
        transactionServerPort: number;
        transactionConfig: TransactionConfig;
    }
    type ConfigOptions = AllPartial<Config>;
}
