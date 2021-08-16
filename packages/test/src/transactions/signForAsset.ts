import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 50,
            remark: { message: "create signForAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            transactionSignature:
                "8308b47af3e4fb7f1698cf3df5d539a3669ff50ffaaf45d09070f66e9c84b48438649b5e467fa117ccf55bce0c64a90513d59f262efc44f265b9e0479812f70b",
            trustAsset: {
                trustees: ["cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE", "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1", "cKySkYVB4MhWhKczSUmY7WhF638hPx6U8N"],
                numberOfSignFor: 1,
                sourceChainName: "bfchain",
                sourceChainMagic: "NCOH8",
                assetType: "BFT",
                amount: "1000",
            },
            trustSenderId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
            recipientId: "cKySkYVB4MhWhKczSUmY7WhF638hPx6U8N",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendSignForAsset(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
