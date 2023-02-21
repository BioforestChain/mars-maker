import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams = {
            secret: "boost scorpion peanut output undo useful trash burden custom party click offer leisure magnet obscure drop gather blind predict walk since strike thumb minimum",
            fee: "200",
            applyBlockHeight: 50,
            remark: { message: "create beExchangeAny" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            transactionSignature:
                "40e59688d147b95d4e4ed378d7019b3709fb79ebaaabfe0bc2c1450c8d21474f5d9dcf527f7ea03b698ce4b955f4049580d38eb218d7a357573b1c03964dfd0c",
            toExchangeAssetPrealnum: "1",
            beExchangeAssetPrealnum: "100000",
            exchangeAny: {
                cipherPublicKeys: [],
                toExchangeSource: "NCOH8",
                beExchangeSource: "NCOH8",
                toExchangeChainName: "bfchain",
                beExchangeChainName: "bfchain",
                toExchangeParentAssetType: PARENT_ASSET_TYPE.ENTITY,
                beExchangeParentAssetType: PARENT_ASSET_TYPE.ASSETS,
                toExchangeAssetType: "skyrim_dragonborn",
                beExchangeAssetType: "BFT",
                toExchangeAssetPrealnum: "1",
                beExchangeAssetPrealnum: "100000",
                taxInformation: {
                    taxCollector: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                    taxAssetPrealnum: "1000",
                },
            },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendBeExchangeAny(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
