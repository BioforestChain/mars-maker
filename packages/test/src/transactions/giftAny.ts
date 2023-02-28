import { PARENT_ASSET_TYPE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.GiftAnyTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 30,
            remark: { message: "create giftAny" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                parentAssetType: PARENT_ASSET_TYPE.ENTITY,
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

        const api = new Api();

        const result = await api.transaction.generateGiftAny(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
