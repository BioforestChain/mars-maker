import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class EmigrateAssetApi extends TransactionApi<BFChainCore.EmigrateAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.EmigrateAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
