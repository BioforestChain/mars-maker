import type { DAppPurchasingTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myDAppPurchasing } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class DAppPurchasingFactory extends TransactionFactory<DAppPurchasingTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING;

    async generateTransaction(request: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams) {
        this.verify(request);
        const dappInfo = request.dappInfo;
        const tr = await myDAppPurchasing.generateDapppurchasing(
            this.getTransactionBody(request),
            {
                dappAsset: {
                    sourceChainName: this.bfchainCore.config.chainName,
                    sourceChainMagic: this.bfchainCore.config.magic,
                    dappid: dappInfo.dappid,
                    type: dappInfo.type,
                    purchaseAsset: dappInfo.purchanseAsset,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
