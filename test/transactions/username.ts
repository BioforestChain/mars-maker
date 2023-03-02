import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.UsernameTransactionParams = {
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

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.transaction.generateUsername(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
