import type { RejectVoteTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class RejectVoteFactory extends TransactionFactory<RejectVoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE;
    generateTransaction(request: BFChainPcSdk.Transaction.RejectVoteTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.RejectVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
