import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 50,
            remark: { message: "create beExchangeAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            transactionSignature:
                "a42409c8c69610d63d30cdc8e58e8daf423e97a5878af1b23e9ce1d059d96b6860b87b22ea8c8e7c92953a126e195f29337cfad506a7b0658e464d7511ac6308",
            toExchangeNumber: "50",
            exchangeAsset: {
                cipherPublicKeys: [],
                toExchangeSource: "NCOH8",
                beExchangeSource: "NCOH8",
                toExchangeChainName: "bfchain",
                beExchangeChainName: "bfchain",
                toExchangeAsset: "BFT",
                beExchangeAsset: "BFT",
                toExchangeNumber: "1000",
                exchangeRate: {
                    prevWeight: "1",
                    nextWeight: "0",
                },
            },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendBeExchangeAsset(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
