import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class TransferAnyApi extends TransactionApi<BFChainCore.TransferAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;
    generateTransaction(argv: BFChainPcSdk.Transaction.TransferAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.TransferAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
