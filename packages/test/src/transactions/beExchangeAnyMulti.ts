import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams = {
            secret: "boost scorpion peanut output undo useful trash burden custom party click offer leisure magnet obscure drop gather blind predict walk since strike thumb minimum",
            fee: "200",
            applyBlockHeight: 50,
            remark: { message: "create beExchangeAnyMulti" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            transactionSignature:
                "40e59688d147b95d4e4ed378d7019b3709fb79ebaaabfe0bc2c1450c8d21474f5d9dcf527f7ea03b698ce4b955f4049580d38eb218d7a357573b1c03964dfd0c",

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
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateBeExchangeAnyMulti(argv);

        if (result.success) {
            console.log(result.result.asset.beExchangeAnyMulti);
        } else {
            console.log(result.error);
        }

        // console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
