import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class GrabAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.GrabAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
