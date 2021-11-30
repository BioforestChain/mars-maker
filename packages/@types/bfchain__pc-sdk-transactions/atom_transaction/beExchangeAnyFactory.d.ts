import type { BeExchangeAnyTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAnyFactory extends TransactionFactory<BeExchangeAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY;
    generateTransaction(request: BFChainPcSdk.Transaction.BeExchangeAnyTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
