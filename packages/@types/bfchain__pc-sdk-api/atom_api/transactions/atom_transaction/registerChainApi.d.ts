import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class RegisterChainApi extends TransactionApi<BFChainCore.RegisterChainTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;
    generateTransaction(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.RegisterChainTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
