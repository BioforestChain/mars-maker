import type { MacroCallTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { TransactionFactory } from "./_transactionFactory";
import { myMacroCall } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class MacroCallFactory extends TransactionFactory<MacroCallTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_MACRO_CALL;

    async generateTransaction(request: TransactionMaker.Transaction.MacroCallTransactionParams) {
        this.verify(request);
        const tr = await myMacroCall.generateMacroCall(
            this.getTransactionBody(request),
            {
                inputs: request.inputs,
                macroId: request.macroId,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
