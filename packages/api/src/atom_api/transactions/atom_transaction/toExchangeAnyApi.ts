import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ToExchangeAnyApi extends TransactionApi<BFChainCore.ToExchangeAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.ToExchangeAnyTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
