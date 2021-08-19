import type { TrustAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class TrustAssetFactory extends TransactionFactory<TrustAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.TrustAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.TrustAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
