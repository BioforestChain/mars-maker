import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GrabAnyApi extends TransactionApi<BFChainCore.GrabAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;

    async generateTransaction(argv: BFChainPcSdk.Transaction.GrabAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.GrabAnyTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
