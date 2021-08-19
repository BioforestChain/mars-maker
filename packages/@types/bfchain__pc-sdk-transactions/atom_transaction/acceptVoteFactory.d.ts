import type { AcceptVoteTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class AcceptVoteFactory extends TransactionFactory<AcceptVoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;
    generateTransaction(request: BFChainPcSdk.Transaction.AcceptVoteTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.AcceptVoteAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
