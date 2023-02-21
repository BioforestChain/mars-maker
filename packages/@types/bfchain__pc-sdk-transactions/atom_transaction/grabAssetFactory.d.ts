import type { GrabAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GrabAssetFactory extends TransactionFactory<GrabAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.GrabAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
