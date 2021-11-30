import type { DestoryEntityTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class DestoryEntityFactory extends TransactionFactory<DestoryEntityTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY;
    generateTransaction(request: BFChainPcSdk.Transaction.DestoryEntityTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.DestoryEntityAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
