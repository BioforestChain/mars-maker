import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GrabAnyApi extends TransactionApi<BFChainCore.GrabAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;
    generateTransaction(argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.GrabAnyTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
