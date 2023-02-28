import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class ImmigrateAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.ImmigrateAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
