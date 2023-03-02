import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.RejectVoteTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 15,
            remark: { message: "create rejectVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const bfmetaTrMaker = new BFMetaTrMaker();

        const result = await bfmetaTrMaker.transaction.generateRejectVote(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
