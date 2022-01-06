import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class CommonTransactionApi extends TransactionApi<BFChainCore.TransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_COMMON;

    async broadcastTransaction(transaction: BFChainCore.TransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
