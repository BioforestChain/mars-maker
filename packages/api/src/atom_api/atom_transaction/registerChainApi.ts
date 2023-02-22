import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

export class RegisterChainApi extends TransactionApi<TransactionMaker.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;

    async generateTransaction(argv: TransactionMaker.Transaction.RegisterChainTransactionParams) {
        return await super.generateTransaction(argv);
    }
}
