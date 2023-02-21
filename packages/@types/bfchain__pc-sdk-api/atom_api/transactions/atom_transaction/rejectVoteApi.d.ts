import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class RejectVoteApi extends TransactionApi<BFChainCore.RejectVoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE;
    generateTransaction(argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.RejectVoteTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
