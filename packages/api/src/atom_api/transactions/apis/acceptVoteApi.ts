import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class AcceptVoteApi extends TransactionApi<BFChainCore.AcceptVoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;

    async generateTransaction(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.AcceptVoteTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
