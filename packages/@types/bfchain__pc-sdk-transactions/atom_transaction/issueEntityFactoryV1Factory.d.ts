import type { IssueEntityFactoryTransactionV1 } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class IssueEntityFactoryV1Factory extends TransactionFactory<IssueEntityFactoryTransactionV1> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1;
    generateTransaction(request: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params): Promise<BFChainCore.IssueEntityFactoryTransactionV1JSON>;
}
