import type { TransferAnyTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class TransferAnyFactory extends TransactionFactory<TransferAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;
    generateTransaction(request: BFMetaPcSdk.Transaction.TransferAnyTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.TransferAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
