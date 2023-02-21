import type { BeExchangeSpecialAssetTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myBeExchangeSpecialAsset } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class BeExchangeSpecialAssetFactory extends TransactionFactory<BeExchangeSpecialAssetTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET;

    async generateTransaction(request: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        this.verify(request);
        const tr = await myBeExchangeSpecialAsset.generateBeExchangeSpecialAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                exchangeSpecialAsset: request.exchangeSpecialAsset,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
