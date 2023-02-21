import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DestoryEntityApi extends TransactionApi<BFChainCore.DestoryEntityTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.DestoryEntityTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
