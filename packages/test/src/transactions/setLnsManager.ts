import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams = {
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

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendSetLnsManager(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
