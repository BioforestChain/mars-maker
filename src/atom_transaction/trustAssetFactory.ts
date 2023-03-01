import type { TrustAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myTrustAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class TrustAssetFactory extends TransactionFactory<TrustAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.TrustAssetTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myTrustAsset.generateTrustAsset(
            this.getTransactionBody(request),
            {
                trustees: request.trustees,
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
                numberOfSignFor: request.numberOfSignFor,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
