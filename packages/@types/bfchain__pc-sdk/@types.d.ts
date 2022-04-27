declare namespace BFChainPcSdk {
    interface Config {
        configRootPath?: string;
        genesisBlockRootPath?: string;
        apiConfig: ApiConfig;
        transactionServerPort: number;
        transactionConfig: TransactionConfig;
    }
    interface ConfigOptions {
        configRootPath?: string;
        genesisBlockRootPath?: string;
        apiConfig?: ApiConfigOptions;
        transactionServerPort?: number;
        transactionConfig?: TransactionConfigOptions;
    }
}
