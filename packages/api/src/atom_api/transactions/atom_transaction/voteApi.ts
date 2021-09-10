import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class VoteApi extends TransactionApi<BFChainCore.VoteTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_VOTE;

    async generateTransaction(argv: BFChainPcSdk.Transaction.VoteTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.VoteTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
