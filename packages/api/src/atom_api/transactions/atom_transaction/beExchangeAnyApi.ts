import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class BeExchangeAnyApi extends TransactionApi<BFChainCore.BeExchangeAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY;

    async generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeAnyTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.BeExchangeAnyTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
