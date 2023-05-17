import type { DAppTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { _TransactionFactory } from "./_transactionFactory";
import { myDApp } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class DAppFactory extends _TransactionFactory<DAppTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP;

    async generateTransaction(request: TransactionMaker.Transaction.DAppTransactionParams) {
        this.verify(request);
        const dappInfo = request.dappInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDApp.generateDApp(
            this.getTransactionBody(request),
            {
                sourceChainName: chainName,
                sourceChainMagic: magic,
                dappid: "",
                type: dappInfo.type as number,
                purchaseAsset: dappInfo.purchanseAsset,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore,
            dappInfo.newDappid
        );
        return tr.toJSON();
    }
}
