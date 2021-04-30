import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class RejectVoteApi extends TransactionApi<BFChainCore.RejectVoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE;

    async generateTransaction(argv: BFChainPcSdk.Transaction.RejectVoteTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.RejectVoteTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
