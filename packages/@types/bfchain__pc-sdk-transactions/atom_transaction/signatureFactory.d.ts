import type { SignatureTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SignatureFactory extends TransactionFactory<SignatureTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE;
    generateTransaction(request: BFMetaPcSdk.Transaction.SignatureTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.SignatureAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
