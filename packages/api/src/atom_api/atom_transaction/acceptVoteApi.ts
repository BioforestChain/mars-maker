import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class AcceptVoteApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;

    async generateTransaction(argv: TransactionMaker.Transaction.AcceptVoteTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
