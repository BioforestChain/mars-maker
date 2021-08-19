export declare class BasicApi {
    private __networkHelper;
    private __BASIC_API_MAP;
    constructor(__networkHelper: BFChainPcSdk.NetworkHelper);
    private __init;
    private __getBasicApi;
    getBlock(argv: BFChainPcSdk.Basic.GetBlockParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetBlockResult>>;
    getLastBlock(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetLastBlockResult>>;
    getTransactionType(argv: BFChainPcSdk.Basic.GetTransactionTypeParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetTransactionTypeResult>>;
    getTransactions(argv: BFChainPcSdk.Basic.GetTransactionsParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetTransactionsResult>>;
    getBfchainVersion(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetBfchainVersionResult>>;
    getBlockChainStatus(): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetBlockChainStatusResult>>;
    generateSecret(argv: BFChainPcSdk.Basic.GenerateSecretParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GenerateSecretResult>>;
    createAccount(argv: BFChainPcSdk.Basic.CreateAccountParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.CreateAccountResult>>;
    getAccountPublicKey(argv: BFChainPcSdk.Basic.GetAccountPublicKeyParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetAccountPublicKeyResult>>;
    getAccountLastTransaction(argv: BFChainPcSdk.Basic.GetAccountLastTransactionParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetAccountLastTransactionResult>>;
    getSystemKey(systemSecret: string): string;
}
