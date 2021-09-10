import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ImmigrateAssetApi extends TransactionApi<BFChainCore.ImmigrateAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.ImmigrateAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
