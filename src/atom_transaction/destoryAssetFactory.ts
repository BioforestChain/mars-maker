import type { DestoryAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myDestoryAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class DestoryAssetFactory extends TransactionFactory<DestoryAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.DestoryAssetTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDestoryAsset.generateDestoryAsset(
            this.getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                assetType: assetInfo.assetType,
                amount: assetInfo.amount,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
