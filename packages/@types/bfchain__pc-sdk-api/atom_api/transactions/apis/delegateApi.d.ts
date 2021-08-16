import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DelegateApi extends TransactionApi<BFChainCore.DelegateTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;
    generateTransaction(argv: BFChainPcSdk.Transaction.DelegateTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.DelegateTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.DelegateAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
}
