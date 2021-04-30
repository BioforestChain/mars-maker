import type { UsernameTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myUsername } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class UsernameFactory extends TransactionFactory<UsernameTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_USERNAME;

    async generateTransaction(request: BFChainPcSdk.Transaction.UsernameTransactionParams) {
        this.verify(request);
        const tr = await myUsername.generateUsername(
            this.getTransactionBody(request),
            { alias: request.alias },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
