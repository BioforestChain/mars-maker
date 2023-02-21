import type { RegisterChainTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class RegisterChainFactory extends TransactionFactory<RegisterChainTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;
    generateTransaction(request: BFMetaPcSdk.Transaction.RegisterChainTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
