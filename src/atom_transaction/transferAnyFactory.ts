import type { TransferAnyTransaction } from "@bfchain/core";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myTransferAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class TransferAnyFactory extends _TransactionFactory<TransferAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY;

    async generateTransaction(request: TransactionMaker.Transaction.TransferAnyTransactionParams) {
        this.verify(request);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const transferAny: BFChainCore.TransferAnyJSON = {
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: assetInfo.parentAssetType as number,
            assetType: assetInfo.assetType,
            amount: assetInfo.amount,
            taxInformation: request.taxInformation,
        };

        const tr = await myTransferAny.generateTransferAny(this.getTransactionBody(request), transferAny, this.getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }
}
