import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DestoryAssetApi extends TransactionApi<BFChainCore.DestoryAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.DestoryAssetTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.DestoryAssetTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
}
