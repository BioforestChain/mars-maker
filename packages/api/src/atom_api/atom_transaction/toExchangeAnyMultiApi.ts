import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class ToExchangeAnyMultiApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI;

    async generateTransaction(argv: TransactionMaker.Transaction.ToExchangeAnyMultiTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
