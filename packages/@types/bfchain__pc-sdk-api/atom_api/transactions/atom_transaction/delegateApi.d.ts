import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DelegateApi extends TransactionApi<BFChainCore.DelegateTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;
    generateTransaction(argv: BFMetaPcSdk.Transaction.DelegateTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.DelegateTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
