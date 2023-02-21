import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class IssueEntityFactoryApi extends TransactionApi<BFChainCore.IssueEntityFactoryTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.IssueEntityFactoryTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
