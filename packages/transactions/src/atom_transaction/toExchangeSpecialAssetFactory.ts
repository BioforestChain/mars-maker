import type { ToExchangeSpecialAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myToExchangeSpecialAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class ToExchangeSpecialAssetFactory extends TransactionFactory<ToExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(request: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        this.verify(request);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfo, beExchangeInfo } = request;
        const tr = await myToExchangeSpecialAsset.generateToExchangeSpecialAsset(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeAsset: toExchangeInfo.toExchangeAsset,
                beExchangeAsset: beExchangeInfo.beExchangeAsset,
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
