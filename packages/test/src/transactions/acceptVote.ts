import type {} from "@bfchain/coretools";
import { Sdk } from "@bfchain/pc-sdk-core";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams = {
            secret: "qaq",
            secondSecretInfo: { useOld: false, secondSecret: "qwq" },
            fee: "1000",
            applyBlockHeight: 8888888888,
            remark: { message: "create acceptVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateAcceptVote(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
