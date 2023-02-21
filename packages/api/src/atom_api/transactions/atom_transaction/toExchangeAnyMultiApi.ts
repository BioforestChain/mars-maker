import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ToExchangeAnyMultiApi extends TransactionApi<BFChainCore.ToExchangeAnyMultiTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.ToExchangeAnyMultiTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
