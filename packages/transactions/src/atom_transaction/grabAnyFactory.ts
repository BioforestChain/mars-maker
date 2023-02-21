import type { GrabAnyTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myGrabAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class GrabAnyFactory extends TransactionFactory<GrabAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;

    async generateTransaction(request: BFMetaPcSdk.Transaction.GrabAnyTransactionParams) {
        this.verify(request);
        const tr = await myGrabAny.generateGrabAny(
            this.getTransactionBody(request),
            {
                blockSignature: request.blockSignature,
                transactionSignature: request.transactionSignature,
                amount: "0",
                giftAny: request.giftAny,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
