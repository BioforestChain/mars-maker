import type { ToExchangeAnyMultiTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myToExchangeAnyMulti } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class ToExchangeAnyMultiFactory extends _TransactionFactory<ToExchangeAnyMultiTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI;

    async generateTransaction(request: TransactionMaker.Transaction.ToExchangeAnyMultiTransactionParams) {
        this.verify(request);
        const { toExchangeInfos, beExchangeInfo, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;

        const toExchangeAssets: BFChainCore.ToExchangeAssetV1JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                assetExchangeWeightRatio: toExchangeInfo.assetExchangeWeightRatio,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }

        const tr = await myToExchangeAnyMulti.generateToExchangeAnyMulti(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeAssets,
                beExchangeAsset: {
                    beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                    beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                    beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                    beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                    beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                    taxInformation: beExchangeInfo.taxInformation,
                },
            },
            ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
