import type { BeExchangeAnyTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myBeExchangeAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class BeExchangeAnyFactory extends TransactionFactory<BeExchangeAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY;

    async generateTransaction(request: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams) {
        this.verify(request);
        const { magic, chainName } = this.bfchainCore.config;
        const exchangeAny = request.exchangeAny;
        const tr = await myBeExchangeAny.generateBeExchangeAny(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssetPrealnum: request.toExchangeAssetPrealnum,
                beExchangeAssetPrealnum: request.beExchangeAssetPrealnum,
                taxInformation: request.taxInformation,
                exchangeAny: {
                    cipherPublicKeys: exchangeAny.cipherPublicKeys,
                    toExchangeSource: exchangeAny.toExchangeSource || magic,
                    beExchangeSource: exchangeAny.beExchangeSource || magic,
                    toExchangeChainName: exchangeAny.toExchangeChainName || chainName,
                    beExchangeChainName: exchangeAny.beExchangeChainName || chainName,
                    toExchangeParentAssetType: exchangeAny.toExchangeParentAssetType,
                    beExchangeParentAssetType: exchangeAny.beExchangeParentAssetType,
                    toExchangeAssetType: exchangeAny.toExchangeAssetType,
                    beExchangeAssetType: exchangeAny.beExchangeAssetType,
                    toExchangeAssetPrealnum: exchangeAny.toExchangeAssetPrealnum,
                    beExchangeAssetPrealnum: exchangeAny.beExchangeAssetPrealnum,
                    assetExchangeWeightRatio: exchangeAny.assetExchangeWeightRatio,
                    taxInformation: exchangeAny.taxInformation,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
