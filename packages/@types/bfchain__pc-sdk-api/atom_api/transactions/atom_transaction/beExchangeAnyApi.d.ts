import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAnyApi extends TransactionApi<BFChainCore.BeExchangeAnyTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY;
    generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<BFChainPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
    broadcastTransaction(transaction: BFChainCore.BeExchangeAnyTransactionJSON): Promise<BFChainPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>>;
}
