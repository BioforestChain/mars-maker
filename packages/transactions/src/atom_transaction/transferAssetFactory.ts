import type { TransferAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myTransferAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class TransferAssetFactory extends TransactionFactory<TransferAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.TransferAssetTransactionParams) {
        this.verify(request);
        const tr = await myTransferAsset.generateTransferAsset(
            this.getTransactionBody(request),
            {
                sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
                sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
                assetType: request.assetType,
                amount: request.amount,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
