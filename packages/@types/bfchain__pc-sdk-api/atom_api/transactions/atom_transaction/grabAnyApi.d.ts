import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GrabAnyApi extends TransactionApi<BFChainCore.GrabAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;
    generateTransaction(argv: BFChainPcSdk.Transaction.GrabAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.GrabAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
