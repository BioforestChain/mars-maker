import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeSpecialAssetApi extends TransactionApi<BFChainCore.ToExchangeSpecialAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET;
    generateTransaction(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<BFMetaPcSdk.TransactionServer.GenerateTransactionReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
    broadcastTransaction(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON): Promise<BFMetaPcSdk.Transaction.TransactionApiReturn<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>>;
}
