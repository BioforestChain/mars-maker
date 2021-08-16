import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AcceptVoteApi extends TransactionApi<BFChainCore.AcceptVoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;
    generateTransaction(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.AcceptVoteTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
}
