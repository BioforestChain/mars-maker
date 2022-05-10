import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class BeExchangeAnyMultiApi extends TransactionApi<BFChainCore.BeExchangeAnyMultiTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI;

    async generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeAnyMultiTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.BeExchangeAnyMultiTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
