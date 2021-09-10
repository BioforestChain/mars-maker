import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ToExchangeAssetApi extends TransactionApi<BFChainCore.ToExchangeAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.ToExchangeAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
