import type { TransferAnyTransaction } from "@bfchain/core";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myTransferAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class TransferAnyFactory extends TransactionFactory<TransferAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;

    async generateTransaction(request: BFMetaPcSdk.Transaction.TransferAnyTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const transferAny: BFChainCore.TransferAnyJSON = {
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: assetInfo.parentAssetType,
            assetType: assetInfo.assetType,
            amount: assetInfo.amount,
            taxInformation: request.taxInformation,
        };

        const tr = await myTransferAny.generateTransferAny(this.getTransactionBody(request), transferAny, this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
