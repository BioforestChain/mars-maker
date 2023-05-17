import type { PromiseTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myPromise } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class PromiseFactory extends _TransactionFactory<PromiseTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_PROMISE;

    async generateTransaction(request: TransactionMaker.Transaction.PromiseTransactionParams) {
        this.verify(request);
        const tr = await myPromise.generatePromise(
            this.getTransactionBody(request),
            {
                transaction: request.transaction,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
