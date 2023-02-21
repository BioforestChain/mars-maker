import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class BeExchangeSpecialAssetApi extends TransactionApi<BFChainCore.BeExchangeSpecialAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
