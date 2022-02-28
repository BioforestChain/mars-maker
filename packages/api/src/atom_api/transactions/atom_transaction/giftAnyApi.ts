import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GiftAnyApi extends TransactionApi<BFChainCore.GiftAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY;

    async generateTransaction(argv: BFChainPcSdk.Transaction.GiftAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.GiftAnyTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
