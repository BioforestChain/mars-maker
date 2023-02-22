import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class UsernameApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_USERNAME;

    async generateTransaction(argv: TransactionMaker.Transaction.UsernameTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
