import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class GiftAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.GiftAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
