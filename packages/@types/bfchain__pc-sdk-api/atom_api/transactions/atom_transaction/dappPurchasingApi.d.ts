import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DAppPurchasingApi extends TransactionApi<BFChainCore.DAppPurchasingTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING;
    generateTransaction(argv: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.DAppPurchasingTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
