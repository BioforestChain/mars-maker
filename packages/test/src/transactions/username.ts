import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.UsernameTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            fee: "1000",
            applyBlockHeight: 1,
            remark: { message: "create username" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            alias: "a_long_lose_father",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendUsername(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
