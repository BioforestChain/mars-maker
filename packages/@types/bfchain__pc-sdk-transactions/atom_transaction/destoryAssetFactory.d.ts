import type { DestoryAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DestoryAssetFactory extends TransactionFactory<DestoryAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
