import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.SetLnsManagerTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create setLnsManager" },
            recipientId: "cKySkYVB4MhWhKczSUmY7WhF638hPx6U8N",
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            name: "hylq.bfchain",
        };

        const api = new Api();

        const result = await api.transaction.generateSetLnsManager(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
