import type { GiftAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myGiftAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class GiftAssetFactory extends TransactionFactory<GiftAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;

    async generateTransaction(request: BFMetaPcSdk.Transaction.GiftAssetTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myGiftAsset.generateGiftAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
                totalGrabableTimes: request.totalGrabableTimes,
                giftDistributionRule: request.giftDistributionRule,
            },
            request.ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
