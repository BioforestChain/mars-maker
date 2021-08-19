import type { TransferAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class TransferAssetFactory extends TransactionFactory<TransferAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.TransferAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
