import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class IssueEntityFactoryV1Api extends TransactionApi<BFChainCore.IssueEntityFactoryTransactionV1JSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1;

    async generateTransaction(argv: BFChainPcSdk.Transaction.IssueEntityFactoryTransactionV1Params) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.IssueEntityFactoryTransactionV1JSON) {
        return await super.broadcastTransaction(transaction);
    }
}
