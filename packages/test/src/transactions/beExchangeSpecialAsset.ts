import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.BeExchangeSpecialAssetTransactionParams = {
            // secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            secret: "boost scorpion peanut output undo useful trash burden custom party click offer leisure magnet obscure drop gather blind predict walk since strike thumb minimum",
            fee: "1000",
            applyBlockHeight: 50,
            remark: { message: "create beExchangeSpecialAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            transactionSignature:
                "76a1353627804f450035afb7c2bbf9713252bedd29f41b28ac99da10f1eb4bce5ecdadb7696493207caf0bd6ab3aa816fd05722563ee05597c0c76c8d4b9bd02",
            exchangeSpecialAsset: {
                cipherPublicKeys: [],
                toExchangeSource: "NCOH8",
                beExchangeSource: "NCOH8",
                toExchangeChainName: "bfchain",
                beExchangeChainName: "bfchain",
                toExchangeAsset: "hylq.bfchain",
                beExchangeAsset: "BFT",
                exchangeNumber: "66666",
                exchangeAssetType: 1,
                exchangeDirection: 0,
            },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
        };

        const api = new Api();

        const result = await api.transaction.generateBeExchangeSpecialAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
