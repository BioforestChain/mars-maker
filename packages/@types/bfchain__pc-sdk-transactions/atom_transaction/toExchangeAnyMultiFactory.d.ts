import type { ToExchangeAnyMultiTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeAnyMultiFactory extends TransactionFactory<ToExchangeAnyMultiTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI;
    generateTransaction(request: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
