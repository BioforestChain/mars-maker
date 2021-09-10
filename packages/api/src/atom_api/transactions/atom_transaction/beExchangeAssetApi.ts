import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class BeExchangeAssetApi extends TransactionApi<BFChainCore.BeExchangeAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.BeExchangeAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
