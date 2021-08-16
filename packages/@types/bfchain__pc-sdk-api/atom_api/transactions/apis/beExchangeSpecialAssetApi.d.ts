import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeSpecialAssetApi extends TransactionApi<BFChainCore.BeExchangeSpecialAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
}
