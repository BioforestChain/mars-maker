import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeAnyMultiApi extends TransactionApi<BFChainCore.ToExchangeAnyMultiTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI;
    generateTransaction(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.ToExchangeAnyMultiTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
