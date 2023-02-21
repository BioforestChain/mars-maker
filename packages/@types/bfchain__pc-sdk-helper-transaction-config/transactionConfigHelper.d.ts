export declare class TransactionConfigHelper {
    private __transactionConfig;
    constructor(configOptions?: BFMetaPcSdk.TransactionConfigOptions);
    private __initConfig;
    setGenesisInfoConfig(genesisInfoConfigOptions: BFMetaPcSdk.GenesisInfoConfigOptions): void;
    setTransactionConfig(transactionConfigOptions: BFMetaPcSdk.TransactionConfigOptions): void;
    get transactionConfig(): BFMetaPcSdk.TransactionConfig;
}
