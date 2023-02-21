import type { ToExchangeSpecialAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeSpecialAssetFactory extends TransactionFactory<ToExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
