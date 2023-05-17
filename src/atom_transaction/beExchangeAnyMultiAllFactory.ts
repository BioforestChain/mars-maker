import type { BeExchangeAnyMultiAllTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myBeExchangeAnyMultiAll } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class BeExchangeAnyMultiAllFactory extends _TransactionFactory<BeExchangeAnyMultiAllTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI_ALL;

    async generateTransaction(request: TransactionMaker.Transaction.BeExchangeAnyMultiAllTransactionParams) {
        this.verify(request);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfos, beExchangeInfos, ciphertext } = request;

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

        const tr = await myBeExchangeAnyMultiAll.generateBeExchangeAnyMultiAll(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssets,
                beExchangeAssets,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            ciphertext
        );
        return tr.toJSON();
    }
}
