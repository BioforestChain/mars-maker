import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetLnsManagerApi extends TransactionApi<BFChainCore.SetLnsManagerTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER;
    generateTransaction(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.SetLnsManagerTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
