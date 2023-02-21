import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAnyMultiApi extends TransactionApi<BFChainCore.BeExchangeAnyMultiTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI;
    generateTransaction(argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.BeExchangeAnyMultiTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
