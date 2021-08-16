import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeAssetApi extends TransactionApi<BFChainCore.ToExchangeAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.ToExchangeAssetTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
}
