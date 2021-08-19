import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class RegisterChainApi extends TransactionApi<BFChainCore.RegisterChainTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN;
    generateTransaction(argv: BFChainPcSdk.Transaction.RegisterChainTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.RegisterChainTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.RegisterChainAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
