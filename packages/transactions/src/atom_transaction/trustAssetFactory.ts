import type { TrustAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myTrustAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class TrustAssetFactory extends TransactionFactory<TrustAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.TrustAssetTransactionParams) {
        this.verify(request);
        const tr = await myTrustAsset.generateTrustAsset(
            this.getTransactionBody(request),
            {
                trustees: request.trustees,
                sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
                sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
                assetType: request.assetType,
                amount: request.amount,
                numberOfSignFor: request.numberOfSignFor,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
