import type { IssueEntityMultiTransactionV1 } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityMultiFactory extends TransactionFactory<IssueEntityMultiTransactionV1> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;
    generateTransaction(request: BFChainPcSdk.Transaction.IssueEntityMultiTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityMultiAssetV1JSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
