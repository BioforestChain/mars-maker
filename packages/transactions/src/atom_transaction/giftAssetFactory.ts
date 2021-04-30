import type { GiftAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myGiftAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class GiftAssetFactory extends TransactionFactory<GiftAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.GiftAssetTransactionParams) {
        this.verify(request);
        const tr = await myGiftAsset.generateGiftAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
                sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
                assetType: request.assetType,
                amount: request.amount,
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
