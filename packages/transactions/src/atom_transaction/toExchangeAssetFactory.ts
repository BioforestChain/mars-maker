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
        const tr = await myToExchangeAsset.generateToExchangeAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: request.toExchangeSource || this.bfchainCore.config.magic,
                beExchangeSource: request.beExchangeSource || this.bfchainCore.config.magic,
                toExchangeChainName: request.toExchangeChainName || this.bfchainCore.config.chainName,
                beExchangeChainName: request.beExchangeChainName || this.bfchainCore.config.chainName,
                toExchangeAsset: request.toExchangeAsset,
                beExchangeAsset: request.beExchangeAsset,
                toExchangeNumber: request.toExchangeNumber,
                exchangeRate: request.exchangeRate,
            },
            request.ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
