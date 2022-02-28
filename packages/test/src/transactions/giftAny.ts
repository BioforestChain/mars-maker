import { GIFT_DISTRIBUTION_RULE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.GiftAnyTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 30,
            remark: { message: "create giftAny" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                assetType: "skyrim_dragonborn",
                amount: "1",
            },
            totalGrabableTimes: 1,
            // giftDistributionRule: GIFT_DISTRIBUTION_RULE.AVERAGE,
            taxInformation: {
                taxCollector: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                taxAssetPrealnum: "1000",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendGiftAny(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
