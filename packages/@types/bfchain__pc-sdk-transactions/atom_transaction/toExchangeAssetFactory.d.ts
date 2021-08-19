import type { ToExchangeAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class ToExchangeAssetFactory extends TransactionFactory<ToExchangeAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.ToExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: undefined;
    }>;
}
