import type { UsernameTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class UsernameFactory extends TransactionFactory<UsernameTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_USERNAME;
    generateTransaction(request: BFMetaPcSdk.Transaction.UsernameTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
