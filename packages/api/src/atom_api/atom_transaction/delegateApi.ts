import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class DelegateApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;

    async generateTransaction(argv: TransactionMaker.Transaction.DelegateTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
