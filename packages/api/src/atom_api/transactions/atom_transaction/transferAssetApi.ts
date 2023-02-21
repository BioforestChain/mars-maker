import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class TransferAssetApi extends TransactionApi<BFChainCore.TransferAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.TransferAssetTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
