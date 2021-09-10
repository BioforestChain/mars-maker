import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GrabAssetApi extends TransactionApi<BFChainCore.GrabAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.GrabAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
