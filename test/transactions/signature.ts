import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.SignatureTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            fee: "1000",
            applyBlockHeight: 40,
            remark: { message: "create signature" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            newSecondSecretInfo: {
                useOld: false,
                secondSecret: "i am the future",
            },
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.transaction.generateSignature(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
