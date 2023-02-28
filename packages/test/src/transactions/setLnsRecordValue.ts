import { RECORD_OPERATION_TYPE, RECORD_TYPE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.SetLnsRecordValueTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create setLnsRecordValue" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            name: "hylq.bfchain",
            addRecord: {
                recordType: RECORD_TYPE.IPV4,
                recordValue: "192.168.111.119",
            },
            operationType: RECORD_OPERATION_TYPE.ADD,
        };

        const api = new Api();

        const result = await api.transaction.generateSetLnsRecordValue(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
