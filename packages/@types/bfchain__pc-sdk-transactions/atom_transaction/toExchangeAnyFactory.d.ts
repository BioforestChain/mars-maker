import type { ToExchangeAnyTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeAnyFactory extends TransactionFactory<ToExchangeAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY;
    generateTransaction(request: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
