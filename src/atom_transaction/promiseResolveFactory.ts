import type { PromiseResolveTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myPromiseResolve } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class PromiseResolveFactory extends TransactionFactory<PromiseResolveTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_PROMISE_RESOLVE;

    async generateTransaction(request: TransactionMaker.Transaction.PromiseResolveTransactionParams) {
        this.verify(request);
        const tr = await myPromiseResolve.generatePromiseResolve(
            this.getTransactionBody(request),
            {
                promiseId: request.promiseId,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
