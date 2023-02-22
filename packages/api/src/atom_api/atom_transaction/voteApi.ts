import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class VoteApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_VOTE;

    async generateTransaction(argv: TransactionMaker.Transaction.VoteTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
