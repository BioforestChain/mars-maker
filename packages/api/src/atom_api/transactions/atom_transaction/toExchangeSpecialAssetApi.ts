import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ToExchangeSpecialAssetApi extends TransactionApi<BFChainCore.ToExchangeSpecialAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
