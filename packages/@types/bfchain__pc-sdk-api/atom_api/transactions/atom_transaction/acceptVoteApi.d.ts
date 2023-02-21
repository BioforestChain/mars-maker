import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AcceptVoteApi extends TransactionApi<BFChainCore.AcceptVoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;
    generateTransaction(argv: BFMetaPcSdk.Transaction.AcceptVoteTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.AcceptVoteTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
