import type { ToExchangeAnyTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myToExchangeAny } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class ToExchangeAnyFactory extends TransactionFactory<ToExchangeAnyTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY;

    async generateTransaction(request: BFChainPcSdk.Transaction.ToExchangeAnyTransactionParams) {
        this.verify(request);
        const { toExchangeInfo, beExchangeInfo, assetExchangeWeightRatio, ciphertexts, taxInformation } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myToExchangeAny.generateToExchangeAny(
            this.getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType,
                beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                assetExchangeWeightRatio: assetExchangeWeightRatio,
                taxInformation,
            },
            ciphertexts,
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
