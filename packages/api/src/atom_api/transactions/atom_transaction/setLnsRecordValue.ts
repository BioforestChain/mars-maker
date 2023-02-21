import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetLnsRecordValueApi extends TransactionApi<BFChainCore.SetLnsRecordValueTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE;

    async generateTransaction(argv: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.SetLnsRecordValueTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
