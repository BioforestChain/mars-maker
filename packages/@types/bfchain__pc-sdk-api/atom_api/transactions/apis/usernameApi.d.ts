import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class UsernameApi extends TransactionApi<BFChainCore.UsernameTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_USERNAME;
    generateTransaction(argv: BFChainPcSdk.Transaction.UsernameTransactionParams): Promise<
        BFChainPcSdk.TransactionServer.GenerateTransactionReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
    broadcastTransaction(transaction: BFChainCore.UsernameTransactionJSON): Promise<
        BFChainPcSdk.Transaction.TransactionApiReturn<
            Omit<BFChainCore.TransactionJSON<BFChainCore.UsernameAssetJSON>, "recipientId"> & {
                recipientId: undefined;
            }
        >
    >;
}
