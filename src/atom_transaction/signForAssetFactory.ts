import type { SignForAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { mySignForAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class SignForAssetFactory extends _TransactionFactory<SignForAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.SignForAssetTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const trustAsset = request.trustAsset;
        const tr = await mySignForAsset.generateSignForAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                trustSenderId: request.trustSenderId,
                trustRecipientId: request.recipientId,
                trustAsset: {
                    trustees: trustAsset.trustees,
                    sourceChainMagic: trustAsset.sourceChainMagic || config.magic,
                    sourceChainName: trustAsset.sourceChainName || config.chainName,
                    assetType: trustAsset.assetType,
                    amount: trustAsset.amount,
                    numberOfSignFor: trustAsset.numberOfSignFor,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
