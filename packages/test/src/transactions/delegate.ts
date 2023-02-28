import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.DelegateTransactionParams = {
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

        const api = new Api();

        const result = await api.transaction.generateDelegate(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
