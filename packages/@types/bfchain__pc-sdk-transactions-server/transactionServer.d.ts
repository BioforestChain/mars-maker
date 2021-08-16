export declare const getTransactionServerPort: (configRootPath?: string | undefined) => number;
export declare function runTransactionServer(port?: number, configOptions?: BFChainPcSdk.TransactionConfigOptions): Promise<void>;
