import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetLnsRecordValueApi extends TransactionApi<BFChainCore.SetLnsRecordValueTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE;
    generateTransaction(argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.SetLnsRecordValueTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsRecordValueAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
