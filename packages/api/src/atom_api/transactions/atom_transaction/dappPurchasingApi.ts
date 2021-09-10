import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DAppPurchasingApi extends TransactionApi<BFChainCore.DAppPurchasingTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING;

    async generateTransaction(argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.DAppPurchasingTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
