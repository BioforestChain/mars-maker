import type { DAppTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DAppFactory extends TransactionFactory<DAppTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP;
    generateTransaction(request: BFChainPcSdk.Transaction.DAppTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.DAppAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
