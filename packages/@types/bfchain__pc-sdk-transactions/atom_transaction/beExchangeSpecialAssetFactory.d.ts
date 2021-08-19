import type { BeExchangeSpecialAssetTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class BeExchangeSpecialAssetFactory extends TransactionFactory<BeExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET;
    generateTransaction(request: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.BeExchangeSpecialAssetAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
