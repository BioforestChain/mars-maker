import type { ToExchangeAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myToExchangeAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class ToExchangeAssetFactory extends _TransactionFactory<ToExchangeAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET;

    async generateTransaction(request: TransactionMaker.Transaction.ToExchangeAssetTransactionParams) {
        this.verify(request);
        const { toExchangeInfo, beExchangeInfo, exchangeRate, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myToExchangeAsset.generateToExchangeAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeAsset: toExchangeInfo.toExchangeAsset,
                beExchangeAsset: beExchangeInfo.beExchangeAsset,
                toExchangeNumber: toExchangeInfo.toExchangeNumber,
                exchangeRate,
            },
            ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
