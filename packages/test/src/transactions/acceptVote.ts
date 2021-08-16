import * as path from "path";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create acceptVote" },
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
