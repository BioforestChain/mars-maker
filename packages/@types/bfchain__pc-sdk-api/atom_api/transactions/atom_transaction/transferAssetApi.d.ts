import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class TransferAssetApi extends TransactionApi<BFChainCore.TransferAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET;
    generateTransaction(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.TransferAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
