import type { MarkTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myMark } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class MarkFactory extends TransactionFactory<MarkTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MARK;

    async generateTransaction(request: TransactionMaker.Transaction.MarkTransactionParams) {
        this.verify(request);
        const { dappInfo } = request;
        const tr = await myMark.generateMark(
            this.getTransactionBody(request),
            {
                action: request.action,
                content: request.content,
                dapp: {
                    sourceChainName: this.bfchainCore.config.chainName,
                    sourceChainMagic: this.bfchainCore.config.magic,
                    dappid: dappInfo.dappid,
                    type: dappInfo.type as number,
                    purchaseAsset: dappInfo.purchanseAsset,
                },
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
