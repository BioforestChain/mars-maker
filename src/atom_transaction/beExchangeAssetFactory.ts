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
        const tr = await myBeExchangeAsset.generateBeExchangeAsset(
            this.getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                beExchangeNumber: "0",
                toExchangeNumber: request.toExchangeNumber,
                exchangeAsset: request.exchangeAsset,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }
}
