import type { IssueAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueAssetFactory extends TransactionFactory<IssueAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.IssueAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
