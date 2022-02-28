import type { GiftAnyTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GiftAnyFactory extends TransactionFactory<GiftAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY;
    generateTransaction(request: BFChainPcSdk.Transaction.GiftAnyTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.GiftAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
