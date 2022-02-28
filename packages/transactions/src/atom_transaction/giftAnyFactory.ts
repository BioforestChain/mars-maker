import type { GiftAnyTransaction } from "@bfchain/core";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myGiftAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class GiftAnyFactory extends TransactionFactory<GiftAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY;

    async generateTransaction(request: BFChainPcSdk.Transaction.GiftAnyTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const giftAny: BFChainCore.GiftAnyJSON = {
            cipherPublicKeys: [],
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: PARENT_ASSET_TYPE.ASSETS,
            assetType: config.assetType,
            amount: assetInfo.amount || "1",
            giftDistributionRule: request.giftDistributionRule,
            totalGrabableTimes: request.totalGrabableTimes || 1,
            taxInformation: request.taxInformation,
        };

        if (assetInfo.assetType) {
            giftAny.assetType = assetInfo.assetType;
            giftAny.parentAssetType = this.bfchainCore.transactionHelper.getParentAssetType(assetInfo.assetType);
        }

        if (assetInfo.parentAssetType) {
            giftAny.parentAssetType = assetInfo.parentAssetType;
        }

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
