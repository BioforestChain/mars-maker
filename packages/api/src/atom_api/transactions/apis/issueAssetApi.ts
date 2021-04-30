import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class IssueAssetApi extends TransactionApi<BFChainCore.IssueAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.IssueAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.IssueAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
