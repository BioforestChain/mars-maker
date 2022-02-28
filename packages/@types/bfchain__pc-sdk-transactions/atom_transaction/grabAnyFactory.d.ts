import type { GrabAnyTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GrabAnyFactory extends TransactionFactory<GrabAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;
    generateTransaction(request: BFChainPcSdk.Transaction.GrabAnyTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.GrabAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
