import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.ToExchangeAssetTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 50,
            remark: { message: "create toExchangeAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            toExchangeInfo: {
                toExchangeAsset: "BFT",
                toExchangeNumber: "1000",
            },
            beExchangeInfo: {
                beExchangeAsset: "BFT",
            },
            exchangeRate: {
                prevWeight: "1",
                nextWeight: "0",
            },
        };

        const api = new Api();

        const result = await api.transaction.generateToExchangeAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
