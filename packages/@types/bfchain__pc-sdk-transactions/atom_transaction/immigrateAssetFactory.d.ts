import type { ImmigrateAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ImmigrateAssetFactory extends TransactionFactory<ImmigrateAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.ImmigrateAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.ImmigrateAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
