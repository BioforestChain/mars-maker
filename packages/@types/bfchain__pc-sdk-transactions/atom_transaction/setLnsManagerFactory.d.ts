import type { SetLnsManagerTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetLnsManagerFactory extends TransactionFactory<SetLnsManagerTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER;
    generateTransaction(request: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams): Promise<
        Omit<BFChainCore.TransactionJSON<BFChainCore.SetLnsManagerAssetJSON>, "recipientId"> & {
            recipientId: string;
        }
    >;
}
