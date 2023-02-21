import type { IssueEntityFactoryTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityFactoryFactory extends TransactionFactory<IssueEntityFactoryTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY;
    generateTransaction(request: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.IssueEntityFactoryAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
