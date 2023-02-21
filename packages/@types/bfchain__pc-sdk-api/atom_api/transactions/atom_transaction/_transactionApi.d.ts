export declare abstract class TransactionApi<T extends BFChainCore.TransactionJSON> {
    protected networkHelper: BFMetaPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly GENERATE_API_PATH: BFMetaPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
    constructor(networkHelper: BFMetaPcSdk.NetworkHelper);
    generateTransaction(argv: BFMetaPcSdk.Transaction.TransactionCommonParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<T>>;
    broadcastTransaction(transaction: T): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<T>>;
    sendTransaction(argv: BFMetaPcSdk.Transaction.TransactionCommonParams): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<T>>;
}
