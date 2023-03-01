import { PARENT_ASSET_TYPE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const argv: TransactionMaker.Transaction.ToExchangeAnyMultiTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "200",
            applyBlockHeight: 40,
            remark: { message: "create toExchangeAnyMulti" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            toExchangeInfos: [
                {
                    toExchangeParentAssetType: PARENT_ASSET_TYPE.ENTITY,
                    toExchangeAssetType: "skyrim_dragonborn",
                    toExchangeAssetPrealnum: "1",
                    taxInformation: {
                        taxCollector: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                        taxAssetPrealnum: "1000",
                    },
                },
                {
                    toExchangeParentAssetType: PARENT_ASSET_TYPE.ASSETS,
                    toExchangeAssetType: "BFT",
                    toExchangeAssetPrealnum: "100000",
                    assetExchangeWeightRatio: {
                        toExchangeAssetWeight: "1000",
                        beExchangeAssetWeight: "1",
                    },
                },
            ],
            beExchangeInfo: {
                beExchangeParentAssetType: PARENT_ASSET_TYPE.ASSETS,
                beExchangeAssetType: "BFT",
                beExchangeAssetPrealnum: "100000",
            },
        };

        const api = new Api();

        const result = await api.transaction.generateToExchangeAnyMulti(argv);

        if (result.success) {
            console.log(result.result.asset.toExchangeAnyMulti);
        } else {
            console.log(result.error);
        }

        // console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
