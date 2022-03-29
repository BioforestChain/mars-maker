import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class IssueEntityMultiApi extends TransactionApi<BFChainCore.IssueEntityMultiTransactionV1JSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI;

    async generateTransaction(argv: BFChainPcSdk.Transaction.IssueEntityMultiTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.IssueEntityMultiTransactionV1JSON) {
        return await super.broadcastTransaction(transaction);
    }
}
