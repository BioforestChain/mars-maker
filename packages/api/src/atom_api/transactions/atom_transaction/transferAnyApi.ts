import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class TransferAnyApi extends TransactionApi<BFChainCore.TransferAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.TransferAnyTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
