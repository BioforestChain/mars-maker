import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class TrustAssetApi extends TransactionApi<BFChainCore.TrustAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.TrustAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.TrustAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
