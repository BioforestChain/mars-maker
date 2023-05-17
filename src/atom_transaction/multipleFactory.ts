import type { MultipleTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myMultiple } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class MultipleFactory extends _TransactionFactory<MultipleTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MULTIPLE;

    async generateTransaction(request: TransactionMaker.Transaction.MultipleTransactionParams) {
        this.verify(request);
        const tr = await myMultiple.generateMultiple(
            this.getTransactionBody(request),
            {
                transactions: request.transactions,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
