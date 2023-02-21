import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 15,
            remark: { message: "create rejectVote" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendRejectVote(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
