import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class GrabAnyApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;

    async generateTransaction(argv: TransactionMaker.Transaction.GrabAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
