import type { SetLnsRecordValueTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetLnsRecordValueFactory extends TransactionFactory<SetLnsRecordValueTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE;
    generateTransaction(request: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
