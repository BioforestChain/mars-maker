import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams = {
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

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendDAppPurchasing(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
