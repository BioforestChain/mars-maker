import type { GrabAnyTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myGrabAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class GrabAnyFactory extends _TransactionFactory<GrabAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY;

    async generateTransaction(request: TransactionMaker.Transaction.GrabAnyTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const giftAny = request.giftAny;
        const tr = await myGrabAny.generateGrabAny(
            this.getTransactionBody(request),
            {
                blockSignature: request.blockSignature,
                transactionSignature: request.transactionSignature,
                amount: request.amount,
                giftAny: {
                    cipherPublicKeys: giftAny.cipherPublicKeys,
                    sourceChainMagic: giftAny.sourceChainMagic || config.magic,
                    sourceChainName: giftAny.sourceChainName || config.chainName,
                    parentAssetType: giftAny.parentAssetType as number,
                    assetType: giftAny.assetType,
                    amount: giftAny.amount,
                    beginUnfrozenBlockHeight: giftAny.beginUnfrozenBlockHeight,
                    giftDistributionRule: giftAny.giftDistributionRule,
                    totalGrabableTimes: giftAny.totalGrabableTimes,
                    taxInformation: giftAny.taxInformation,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
