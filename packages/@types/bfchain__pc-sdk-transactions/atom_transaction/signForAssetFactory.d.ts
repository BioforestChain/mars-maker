import type { SignForAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SignForAssetFactory extends TransactionFactory<SignForAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.SignForAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.SignForAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
