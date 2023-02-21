import type { DAppPurchasingTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DAppPurchasingFactory extends TransactionFactory<DAppPurchasingTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING;
    generateTransaction(request: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppPurchasingAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
