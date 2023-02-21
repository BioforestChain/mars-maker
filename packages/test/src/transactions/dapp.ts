import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.DAppTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 5,
            remark: { message: "create dapp" },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            dappInfo: {
                newDappid: "BFCHAIN",
                type: 0,
                purchanseAsset: "1000",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendDApp(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
