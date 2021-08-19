import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class EmigrateAssetApi extends TransactionApi<BFChainCore.EmigrateAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.EmigrateAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
