import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GiftAssetApi extends TransactionApi<BFChainCore.GiftAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;
    generateTransaction(argv: BFMetaPcSdk.Transaction.GiftAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.GiftAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
