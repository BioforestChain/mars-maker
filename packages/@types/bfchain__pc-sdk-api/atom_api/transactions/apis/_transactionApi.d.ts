export declare abstract class TransactionApi<T extends BFChainCore.TransactionJSON> {
    protected networkHelper: BFChainPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
    constructor(networkHelper: BFChainPcSdk.NetworkHelper);
    generateTransaction(argv: BFChainPcSdk.Transaction.TransactionCommonParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<T>>;
    broadcastTransaction(transaction: T): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<T>>;
    sendTransaction(argv: BFChainPcSdk.Transaction.TransactionCommonParams): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<T>>;
}
