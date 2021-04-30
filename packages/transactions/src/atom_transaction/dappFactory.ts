import type { DAppTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myDApp } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class DAppFactory extends TransactionFactory<DAppTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP;

    async generateTransaction(request: BFChainPcSdk.Transaction.DAppTransactionParams) {
        this.verify(request);
        const tr = await myDApp.generateDApp(
            this.getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                dappid: "",
                type: request.type,
                purchaseAsset: request.purchanseAsset,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            request.newDappid
        );
        return tr.toJSON();
    }
}
