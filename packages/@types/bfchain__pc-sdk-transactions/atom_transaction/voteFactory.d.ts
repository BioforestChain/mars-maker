import type { VoteTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VoteFactory extends TransactionFactory<VoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_VOTE;
    generateTransaction(request: BFMetaPcSdk.Transaction.VoteTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.VoteAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
