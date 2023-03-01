import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.VoteTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 5,
            remark: { message: "create vote" },
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            equity: "0",
        };

        const api = new Api();

        const result = await api.transaction.generateVote(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
