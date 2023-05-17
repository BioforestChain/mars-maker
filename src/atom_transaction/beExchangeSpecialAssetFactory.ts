import type { BeExchangeSpecialAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myBeExchangeSpecialAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class BeExchangeSpecialAssetFactory extends _TransactionFactory<BeExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.BeExchangeSpecialAssetTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const exchangeSpecialAsset = request.exchangeSpecialAsset;
        const tr = await myBeExchangeSpecialAsset.generateBeExchangeSpecialAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                exchangeSpecialAsset: {
                    cipherPublicKeys: exchangeSpecialAsset.cipherPublicKeys,
                    toExchangeSource: exchangeSpecialAsset.toExchangeSource || config.magic,
                    beExchangeSource: exchangeSpecialAsset.beExchangeSource || config.magic,
                    toExchangeChainName: exchangeSpecialAsset.toExchangeChainName || config.chainName,
                    beExchangeChainName: exchangeSpecialAsset.beExchangeChainName || config.chainName,
                    toExchangeAsset: exchangeSpecialAsset.toExchangeAsset,
                    beExchangeAsset: exchangeSpecialAsset.beExchangeAsset,
                    exchangeNumber: exchangeSpecialAsset.exchangeNumber,
                    exchangeAssetType: exchangeSpecialAsset.exchangeAssetType,
                    exchangeDirection: exchangeSpecialAsset.exchangeDirection,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
