import type { TransferAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myTransferAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class TransferAssetFactory extends _TransactionFactory<TransferAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.TransferAssetTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myTransferAsset.generateTransferAsset(
            this.getTransactionBody(request),
            {
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
