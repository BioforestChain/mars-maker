import type { DestoryAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myDestoryAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class DestoryAssetFactory extends TransactionFactory<DestoryAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.DestoryAssetTransactionParams) {
        this.verify(request);
        const tr = await myDestoryAsset.generateDestoryAsset(
            this.getTransactionBody(request),
            {
                sourceChainMagic: this.bfchainCore.config.magic,
                sourceChainName: this.bfchainCore.config.chainName,
                assetType: request.assetType,
                amount: request.amount,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
