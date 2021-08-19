import type { LocationNameTransaction } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class LocationNameFactory extends TransactionFactory<LocationNameTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME;
    generateTransaction(request: BFChainPcSdk.Transaction.LocationNameTransactionParams): Promise<Omit<BFChainCore.TransactionJSON<BFChainCore.LocationNameAssetJSON>, "recipientId"> & {
        recipientId: string;
    }>;
}
