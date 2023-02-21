import type { SetLnsRecordValueTransaction } from "@bfchain/core";
import { Injectable } from "@bfchain/util";
import { RECORD_OPERATION_TYPE } from "@bfchain/core";
import { TransactionFactory } from "./_transactionFactory";
import { mySetLnsRecordValue } from "@bfchain/coretools-transaction";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class SetLnsRecordValueFactory extends TransactionFactory<SetLnsRecordValueTransaction> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE;

    async generateTransaction(request: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        this.verify(request);
        const operationType = request.operationType;
        const tr = await mySetLnsRecordValue.generateSetLnsRecordValue(
            this.getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                name: request.name,
                operationType: request.operationType,
                addRecord: operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.ADD ? request.addRecord : undefined,
                deleteRecord:
                    operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.DELETE ? request.deleteRecord : undefined,
            },
            this.getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
