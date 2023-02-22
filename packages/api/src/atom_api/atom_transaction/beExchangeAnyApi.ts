import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class BeExchangeAnyApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY;

    async generateTransaction(argv: TransactionMaker.Transaction.BeExchangeAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
