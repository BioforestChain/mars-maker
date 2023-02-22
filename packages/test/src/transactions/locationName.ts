import { LOCATION_NAME_OPERATION_TYPE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.LocationNameTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create locationName" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            name: "hylq",
            operationType: LOCATION_NAME_OPERATION_TYPE.REGISTRATION,
        };

        const api = new Api();

        const result = await api.transaction.generateLocationName(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
