import type { MacroTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myMacro } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class MacroFactory extends TransactionFactory<MacroTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MACRO;

    async generateTransaction(request: TransactionMaker.Transaction.MacroTransactionParams) {
        this.verify(request);
        const tr = await myMacro.generateMacro(
            this.getTransactionBody(request),
            {
                inputs: request.inputs as any,
                template: request.template,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
