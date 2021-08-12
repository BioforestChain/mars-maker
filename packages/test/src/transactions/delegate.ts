import { Sdk } from "@bfchain/pc-sdk-core";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.DelegateTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            secondSecretInfo: {
                useOld: false,
                secondSecret: "i am the future",
            },
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create acceptVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendDelegate(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
