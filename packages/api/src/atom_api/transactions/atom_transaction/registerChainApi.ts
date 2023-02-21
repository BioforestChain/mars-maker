import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class RegisterChainApi extends TransactionApi<BFChainCore.RegisterChainTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.RegisterChainTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
