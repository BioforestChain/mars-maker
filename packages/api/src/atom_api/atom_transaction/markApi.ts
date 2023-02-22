import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class MarkApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MARK;

    async generateTransaction(argv: TransactionMaker.Transaction.MarkTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
