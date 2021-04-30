import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DelegateApi extends TransactionApi<BFChainCore.DelegateTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;

    async generateTransaction(argv: BFChainPcSdk.Transaction.DelegateTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.DelegateTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
