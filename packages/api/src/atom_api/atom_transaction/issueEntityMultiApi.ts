import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class IssueEntityMultiApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;

    async generateTransaction(argv: TransactionMaker.Transaction.IssueEntityMultiTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
