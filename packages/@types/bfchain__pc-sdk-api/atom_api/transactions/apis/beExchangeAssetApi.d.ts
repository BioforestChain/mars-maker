import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAssetApi extends TransactionApi<BFChainCore.BeExchangeAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.BeExchangeAssetTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
}
