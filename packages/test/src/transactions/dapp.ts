import type {} from "@bfchain/coretools";
import { Sdk } from "@bfchain/pc-sdk-core";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.DAppTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create dapp" },
            type: 0,
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            newDappid: "bfchain",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendAcceptVote(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
