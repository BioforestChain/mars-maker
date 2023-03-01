import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.TrustAssetTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 50,
            remark: { message: "create trustAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                assetType: "BFT",
                amount: "1000",
            },
            numberOfSignFor: 1,
            trustees: ["cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE"],
            recipientId: "cKySkYVB4MhWhKczSUmY7WhF638hPx6U8N",
        };

        const api = new Api();

        const result = await api.transaction.generateTrustAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
