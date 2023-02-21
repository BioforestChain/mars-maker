import type { BeExchangeAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeAssetFactory extends TransactionFactory<BeExchangeAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET;
    generateTransaction(request: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
