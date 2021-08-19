import type { EmigrateAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class EmigrateAssetFactory extends TransactionFactory<EmigrateAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.EmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
