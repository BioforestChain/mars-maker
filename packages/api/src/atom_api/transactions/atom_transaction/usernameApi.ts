import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class UsernameApi extends TransactionApi<BFChainCore.UsernameTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_USERNAME;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.UsernameTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.UsernameTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
