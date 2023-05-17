import type { SetLnsRecordValueTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { RECORD_OPERATION_TYPE } from "@bfchain/core";
import { _TransactionFactory } from "./_transactionFactory";
import { mySetLnsRecordValue } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

@Injectable()
export class SetLnsRecordValueFactory extends _TransactionFactory<SetLnsRecordValueTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE;

    async generateTransaction(request: TransactionMaker.Transaction.SetLnsRecordValueTransactionParams) {
        this.verify(request);
        const operationType = request.operationType as number;
        const tr = await mySetLnsRecordValue.generateSetLnsRecordValue(
            this.getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                name: request.name,
                operationType,
                addRecord:
                    operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.ADD ? (request.addRecord as any) : undefined,
                deleteRecord:
                    operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.DELETE
                        ? (request.deleteRecord as any)
                        : undefined,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
