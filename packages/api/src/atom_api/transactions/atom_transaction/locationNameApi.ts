import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class LocationNameApi extends TransactionApi<BFChainCore.LocationNameTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.LocationNameTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.LocationNameTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
