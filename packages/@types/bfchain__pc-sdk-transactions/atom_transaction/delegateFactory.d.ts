import type { DelegateTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DelegateFactory extends TransactionFactory<DelegateTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;
    generateTransaction(request: BFChainPcSdk.Transaction.DelegateTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
