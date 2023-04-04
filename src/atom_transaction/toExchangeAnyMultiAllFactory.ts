import type { ToExchangeAnyMultiAllTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myToExchangeAnyMultiAll } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class ToExchangeAnyMultiAllFactory extends TransactionFactory<ToExchangeAnyMultiAllTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI_ALL;

    async generateTransaction(request: TransactionMaker.Transaction.ToExchangeAnyMultiAllTransactionParams) {
        this.verify(request);
        const { toExchangeInfos, beExchangeInfos, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;

        const toExchangeAssets: BFChainCore.ToExchangeAssetV2JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }
        const beExchangeAssets: BFChainCore.BeExchangeAssetV2JSON[] = [];
        for (const beExchangeInfo of beExchangeInfos) {
            beExchangeAssets.push({
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                taxInformation: beExchangeInfo.taxInformation,
            });
        }

        const tr = await myToExchangeAnyMultiAll.generateToExchangeAnyMultiAll(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeAssets,
                beExchangeAssets,
            },
            ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
