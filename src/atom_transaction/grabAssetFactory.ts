import type { GrabAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myGrabAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class GrabAssetFactory extends _TransactionFactory<GrabAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.GrabAssetTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const giftAsset = request.giftAsset;
        const tr = await myGrabAsset.generateGrabAsset(
            this.getTransactionBody(request),
            {
                blockSignature: request.blockSignature,
                transactionSignature: request.transactionSignature,
                amount: "0",
                giftAsset: {
                    cipherPublicKeys: giftAsset.cipherPublicKeys,
                    sourceChainMagic: giftAsset.sourceChainMagic || config.magic,
                    sourceChainName: giftAsset.sourceChainName || config.chainName,
                    assetType: giftAsset.assetType || config.assetType,
                    amount: giftAsset.amount,
                    totalGrabableTimes: giftAsset.totalGrabableTimes,
                    beginUnfrozenBlockHeight: giftAsset.beginUnfrozenBlockHeight,
                    giftDistributionRule: giftAsset.giftDistributionRule,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
