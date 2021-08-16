import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams = {
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

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendToExchangeAsset(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
