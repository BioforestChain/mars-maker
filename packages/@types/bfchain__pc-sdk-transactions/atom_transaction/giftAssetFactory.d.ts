import type { GiftAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GiftAssetFactory extends TransactionFactory<GiftAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.GiftAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
