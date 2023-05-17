import type { VoteTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myVote } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class VoteFactory extends _TransactionFactory<VoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_VOTE;

    async generateTransaction(request: TransactionMaker.Transaction.VoteTransactionParams) {
        this.verify(request);
        const tr = await myVote.generateVote(this.getTransactionBody(request), { equity: request.equity }, this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
