import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SignForAssetApi extends TransactionApi<BFChainCore.SignForAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET;

    async generateTransaction(argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.SignForAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
