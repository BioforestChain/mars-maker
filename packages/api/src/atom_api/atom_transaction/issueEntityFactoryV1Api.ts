import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class IssueEntityFactoryV1Api extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1;

    async generateTransaction(argv: TransactionMaker.Transaction.IssueEntityFactoryTransactionV1Params) {
        return await super.generateTransaction(argv);
    }
}
