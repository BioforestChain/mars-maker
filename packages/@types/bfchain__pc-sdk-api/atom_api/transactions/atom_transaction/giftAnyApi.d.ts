import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GiftAnyApi extends TransactionApi<BFChainCore.GiftAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY;
    generateTransaction(argv: BFChainPcSdk.Transaction.GiftAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.GiftAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
