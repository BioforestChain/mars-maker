import type { RejectVoteTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myRejectVote } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class RejectVoteFactory extends TransactionFactory<RejectVoteTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE;

    async generateTransaction(request: TransactionMaker.Transaction.RejectVoteTransactionParams) {
        this.verify(request);
        const tr = await myRejectVote.generateRejectVote(this.getTransactionBody(request), this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
