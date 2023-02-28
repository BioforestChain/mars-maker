import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class SignatureApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE;

    async generateTransaction(argv: TransactionMaker.Transaction.SignatureTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
