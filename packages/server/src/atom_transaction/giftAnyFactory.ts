import type { GiftAnyTransaction } from "@bfchain/core";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myGiftAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class GiftAnyFactory extends TransactionFactory<GiftAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY;

    async generateTransaction(request: TransactionMaker.Transaction.GiftAnyTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const giftAny: BFChainCore.GiftAnyJSON = {
            cipherPublicKeys: [],
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: assetInfo.parentAssetType as number,
            assetType: assetInfo.assetType,
            amount: assetInfo.amount,
            giftDistributionRule: request.giftDistributionRule as number,
            totalGrabableTimes: request.totalGrabableTimes || 1,
            taxInformation: request.taxInformation,
        };

        const tr = await myGiftAny.generateGiftAny(
            this.getTransactionBody(request),
            giftAny,
            request.ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
