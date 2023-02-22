import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class TransferAnyApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;

    async generateTransaction(argv: TransactionMaker.Transaction.TransferAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
