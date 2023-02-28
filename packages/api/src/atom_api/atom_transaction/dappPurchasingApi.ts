import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class DAppPurchasingApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING;

    async generateTransaction(argv: TransactionMaker.Transaction.DAppPurchasingTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
