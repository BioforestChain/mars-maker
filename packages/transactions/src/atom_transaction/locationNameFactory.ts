import type { LocationNameTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myLocationName } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class LocationNameFactory extends TransactionFactory<LocationNameTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME;

    async generateTransaction(request: BFChainPcSdk.Transaction.LocationNameTransactionParams) {
        this.verify(request);
        const tr = await myLocationName.generateLocationName(
            this.getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                name: request.name,
                operationType: request.operationType,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
