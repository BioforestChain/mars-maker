import type { TransferAnyTransaction } from "@bfchain/core";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myTransferAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class TransferAnyFactory extends TransactionFactory<TransferAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;

    async generateTransaction(request: BFChainPcSdk.Transaction.TransferAnyTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const transferAny: BFChainCore.TransferAnyJSON = {
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: PARENT_ASSET_TYPE.ASSETS,
            assetType: config.assetType,
            amount: assetInfo.amount || "1",
            taxInformation: request.taxInformation,
        };

        if (assetInfo.assetType) {
            transferAny.assetType = assetInfo.assetType;
            transferAny.parentAssetType = this.bfchainCore.transactionHelper.getParentAssetType(assetInfo.assetType);
        }

        if (assetInfo.parentAssetType) {
            transferAny.parentAssetType = assetInfo.parentAssetType;
        }

        const tr = await myTransferAny.generateTransferAny(this.getTransactionBody(request), transferAny, this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
