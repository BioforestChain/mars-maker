import type { SignForAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { mySignForAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class SignForAssetFactory extends TransactionFactory<SignForAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET;

    async generateTransaction(request: BFMetaPcSdk.Transaction.SignForAssetTransactionParams) {
        this.verify(request);
        const tr = await mySignForAsset.generateSignForAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                trustSenderId: request.trustSenderId,
                trustRecipientId: request.recipientId,
                trustAsset: request.trustAsset,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
