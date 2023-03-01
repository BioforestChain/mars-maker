import type { LocationNameTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myLocationName } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class LocationNameFactory extends TransactionFactory<LocationNameTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME;

    async generateTransaction(request: TransactionMaker.Transaction.LocationNameTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const { name } = request;
        const tr = await myLocationName.generateLocationName(
            this.getTransactionBody(request),
            {
                sourceChainName: config.chainName,
                sourceChainMagic: config.magic,
                name: name.endsWith(config.chainName) ? name : `${name}.${config.chainName}`,
                operationType: request.operationType as number,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
