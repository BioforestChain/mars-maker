import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ImmigrateAssetApi extends TransactionApi<BFChainCore.ImmigrateAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.ImmigrateAssetTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
