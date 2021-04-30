import type { ToExchangeSpecialAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myToExchangeSpecialAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class ToExchangeSpecialAssetFactory extends TransactionFactory<ToExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(request: BFChainPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        this.verify(request);
        const tr = await myToExchangeSpecialAsset.generateToExchangeSpecialAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: request.toExchangeSource || this.bfchainCore.config.magic,
                beExchangeSource: request.beExchangeSource || this.bfchainCore.config.magic,
                toExchangeChainName: request.toExchangeChainName || this.bfchainCore.config.chainName,
                beExchangeChainName: request.beExchangeChainName || this.bfchainCore.config.chainName,
                toExchangeAsset: request.toExchangeAsset,
                beExchangeAsset: request.beExchangeAsset,
                exchangeNumber: request.exchangeNumber,
                exchangeAssetType: request.exchangeAssetType,
                exchangeDirection: request.exchangeDirection,
            },
            request.ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
