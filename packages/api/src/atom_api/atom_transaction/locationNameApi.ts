import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class LocationNameApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME;

    async generateTransaction(argv: TransactionMaker.Transaction.LocationNameTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
