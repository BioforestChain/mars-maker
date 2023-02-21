import type { BeExchangeAnyMultiTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAnyMultiFactory extends TransactionFactory<BeExchangeAnyMultiTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI;
    generateTransaction(request: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAnyMultiAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
