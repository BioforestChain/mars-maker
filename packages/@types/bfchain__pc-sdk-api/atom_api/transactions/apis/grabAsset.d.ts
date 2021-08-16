import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GrabAssetApi extends TransactionApi<BFChainCore.GrabAssetTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET;
    generateTransaction(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.GrabAssetTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAssetAssetJSON>, "recipientId"> & {
                recipientId: string;
            }
        >
    >;
}
