import type { BeExchangeAnyMultiTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myBeExchangeAnyMulti } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class BeExchangeAnyMultiFactory extends TransactionFactory<BeExchangeAnyMultiTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI;

    async generateTransaction(request: BFChainPcSdk.Transaction.BeExchangeAnyMultiTransactionParams) {
        this.verify(request);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfos, beExchangeInfo, ciphertext } = request;

        const toExchangeAssets: BFChainCore.ToExchangeAssetV1JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                assetExchangeWeightRatio: toExchangeInfo.assetExchangeWeightRatio,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }

        const tr = await myBeExchangeAnyMulti.generateBeExchangeAnyMulti(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssets,
                beExchangeAsset: {
                    beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                    beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                    beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType,
                    beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                    beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                    taxInformation: beExchangeInfo.taxInformation,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            ciphertext
        );
        return tr.toJSON();
    }
}
