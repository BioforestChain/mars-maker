import type { SignatureTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { mySignature } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class SignatureFactory extends TransactionFactory<SignatureTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE;

    async generateTransaction(request: TransactionMaker.Transaction.SignatureTransactionParams) {
        this.verify(request);
        const tr = await mySignature.generateSignature(
            this.getTransactionBody(request),
            { publicKey: "" },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.newSecondSecretInfo
        );
        return tr.toJSON();
    }
}
