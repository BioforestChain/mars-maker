import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class ToExchangeAnyApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY;

    async generateTransaction(argv: TransactionMaker.Transaction.ToExchangeAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
