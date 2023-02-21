import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DestoryAssetApi extends TransactionApi<BFChainCore.DestoryAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.DestoryAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
