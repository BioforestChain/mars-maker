export declare class TransactionConfigHelper {
    private __transactionConfig;
    constructor(configOptions?: BFChainPcSdk.TransactionConfigOptions);
    private __initConfig;
    setGenesisInfoConfig(genesisInfoConfigOptions: BFChainPcSdk.GenesisInfoConfigOptions): void;
    setTransactionConfig(transactionConfigOptions: BFChainPcSdk.TransactionConfigOptions): void;
    get transactionConfig(): BFChainPcSdk.TransactionConfig;
}
