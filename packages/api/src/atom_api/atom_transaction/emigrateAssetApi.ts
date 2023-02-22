import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class EmigrateAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.EmigrateAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
