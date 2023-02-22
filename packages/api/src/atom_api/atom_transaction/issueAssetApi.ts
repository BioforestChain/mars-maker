import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class IssueAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.IssueAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
