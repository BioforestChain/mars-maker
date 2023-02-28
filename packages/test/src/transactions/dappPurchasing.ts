import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.DAppPurchasingTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 10,
            remark: { message: "create dappPurchasing" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            dappInfo: {
                type: 0,
                dappid: "BFCHAINN",
                purchanseAsset: "1000",
            },
        };

        const api = new Api();

        const result = await api.transaction.generateDAppPurchasing(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
