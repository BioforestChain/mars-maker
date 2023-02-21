export declare class BasicApi {
    private __networkHelper;
    private __BASIC_API_MAP;
    constructor(__networkHelper: BFMetaPcSdk.NetworkHelper);
    private __init;
    private __getBasicApi;
    getBlock(argv: BFMetaPcSdk.Basic.GetBlockParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetBlockResult>>;
    getLastBlock(): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetLastBlockResult>>;
    getTransactionType(argv: BFMetaPcSdk.Basic.GetTransactionTypeParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetTransactionTypeResult>>;
    getTransactions(argv: BFMetaPcSdk.Basic.GetTransactionsParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetTransactionsResult>>;
    getBfchainVersion(): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetBfchainVersionResult>>;
    getBlockChainStatus(): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetBlockChainStatusResult>>;
    generateSecret(argv: BFMetaPcSdk.Basic.GenerateSecretParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GenerateSecretResult>>;
    createAccount(argv: BFMetaPcSdk.Basic.CreateAccountParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.CreateAccountResult>>;
    getAccountPublicKey(argv: BFMetaPcSdk.Basic.GetAccountPublicKeyParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetAccountPublicKeyResult>>;
    getAccountLastTransaction(argv: BFMetaPcSdk.Basic.GetAccountLastTransactionParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetAccountLastTransactionResult>>;
    getAccountLastTypeTransaction(argv: BFMetaPcSdk.Basic.GetAccountLastTypeTransactionParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetAccountLastTypeTransactionResult>>;
    setKVStorageTemp(argv: BFMetaPcSdk.Basic.SetKVStorageTempParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.SetKVStorageTempResult>>;
    getKVStorage(argv: BFMetaPcSdk.Basic.GetKVStorageParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetKVStorageResult>>;
    getSystemKey(systemSecret: string): string;
}
