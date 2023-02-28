import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.AcceptVoteTransactionParams = {
            secret: "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create acceptVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const api = new Api();

        const result = await api.transaction.generateAcceptVote(argv);

        if (result.success) {
            const xx = await api.common.calcTransactionMinFee({
                transaction: result.result,
                customMinFeePerByte: {
                    numerator: 1000,
                    denominator: 1000,
                },
            });

            console.log(xx);
        }

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
