import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class SetLnsManagerApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER;

    async generateTransaction(argv: TransactionMaker.Transaction.SetLnsManagerTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
