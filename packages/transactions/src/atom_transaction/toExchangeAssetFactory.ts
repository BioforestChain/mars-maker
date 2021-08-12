import type { ToExchangeAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myToExchangeAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class ToExchangeAssetFactory extends TransactionFactory<ToExchangeAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams) {
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
