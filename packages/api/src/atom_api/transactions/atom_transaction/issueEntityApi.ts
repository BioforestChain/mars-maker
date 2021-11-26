import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class IssueEntityApi extends TransactionApi<BFChainCore.IssueEntityTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY;

    async generateTransaction(argv: BFChainPcSdk.Transaction.IssueEntityTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.IssueEntityTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
