import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetLnsManagerApi extends TransactionApi<BFChainCore.SetLnsManagerTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.SetLnsManagerTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
