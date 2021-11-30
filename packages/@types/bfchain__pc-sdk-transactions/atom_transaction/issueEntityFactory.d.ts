import type { IssueEntityTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityFactory extends TransactionFactory<IssueEntityTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY;
    generateTransaction(request: BFChainPcSdk.Transaction.IssueEntityTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
