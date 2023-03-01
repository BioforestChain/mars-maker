import type { AcceptVoteTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myAcceptVote } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class AcceptVoteFactory extends TransactionFactory<AcceptVoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE;

    async generateTransaction(request: TransactionMaker.Transaction.AcceptVoteTransactionParams) {
        this.verify(request);
        const tr = await myAcceptVote.generateAcceptVote(this.getTransactionBody(request), this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
