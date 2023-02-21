import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DestoryEntityApi extends TransactionApi<BFChainCore.DestoryEntityTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY;
    generateTransaction(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.DestoryEntityTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
