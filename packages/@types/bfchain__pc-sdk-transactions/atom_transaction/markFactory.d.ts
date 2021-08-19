import type { MarkTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class MarkFactory extends TransactionFactory<MarkTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MARK;
    generateTransaction(request: BFChainPcSdk.Transaction.MarkTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.MarkAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
