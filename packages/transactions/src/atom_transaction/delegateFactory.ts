import type { DelegateTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myDelegate } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class DelegateFactory extends TransactionFactory<DelegateTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DELEGATE;

    async generateTransaction(request: BFChainPcSdk.Transaction.DelegateTransactionParams) {
        this.verify(request);
        const tr = await myDelegate.generateDelegate(this.getTransactionBody(request), this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
