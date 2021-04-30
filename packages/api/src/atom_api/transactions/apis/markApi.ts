import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class MarkApi extends TransactionApi<BFChainCore.MarkTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MARK;

    async generateTransaction(argv: BFChainPcSdk.Transaction.MarkTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.MarkTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
