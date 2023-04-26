import type { BeExchangeAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myBeExchangeAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class BeExchangeAssetFactory extends TransactionFactory<BeExchangeAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.BeExchangeAssetTransactionParams) {
        this.verify(request);
        const config = this.bfchainCore.config;
        const exchangeAsset = request.exchangeAsset;
        const tr = await myBeExchangeAsset.generateBeExchangeAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                beExchangeNumber: request.beExchangeNumber,
                toExchangeNumber: request.toExchangeNumber,
                exchangeAsset: {
                    cipherPublicKeys: exchangeAsset.cipherPublicKeys,
                    toExchangeSource: exchangeAsset.toExchangeSource || config.magic,
                    beExchangeSource: exchangeAsset.beExchangeSource || config.magic,
                    toExchangeChainName: exchangeAsset.toExchangeChainName || config.chainName,
                    beExchangeChainName: exchangeAsset.beExchangeChainName || config.chainName,
                    toExchangeAsset: exchangeAsset.toExchangeAsset,
                    beExchangeAsset: exchangeAsset.beExchangeAsset,
                    toExchangeNumber: exchangeAsset.toExchangeNumber,
                    exchangeRate: exchangeAsset.exchangeRate,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
