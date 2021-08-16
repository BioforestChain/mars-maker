import { RECORD_OPERATION_TYPE, RECORD_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams = {
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

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendSetLnsRecordValue(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
