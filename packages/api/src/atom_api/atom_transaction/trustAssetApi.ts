import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class TrustAssetApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET;

    async generateTransaction(argv: TransactionMaker.Transaction.TrustAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
