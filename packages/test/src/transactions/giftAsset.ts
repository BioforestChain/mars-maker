import { GIFT_DISTRIBUTION_RULE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.GiftAssetTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 30,
            remark: { message: "create giftAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                assetType: "HYLQ",
                amount: "9",
            },
            totalGrabableTimes: 10,
            giftDistributionRule: GIFT_DISTRIBUTION_RULE.AVERAGE,
        };

        const api = new Api();

        const result = await api.transaction.generateGiftAsset(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
