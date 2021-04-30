import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GiftAssetApi extends TransactionApi<BFChainCore.GiftAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.GiftAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.GiftAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
