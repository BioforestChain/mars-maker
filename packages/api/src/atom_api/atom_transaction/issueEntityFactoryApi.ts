import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class IssueEntityFactoryApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY;

    async generateTransaction(argv: TransactionMaker.Transaction.IssueEntityFactoryTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
