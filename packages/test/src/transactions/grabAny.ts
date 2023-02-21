import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "440000",
            applyBlockHeight: 35,
            remark: { message: "create grabAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            blockSignature: "fabe22d68730d7e0b71b5eb06beb398e5190719d3da2cc0fd39d9adf509554ff18bd99eb4d9cf6cbf8a7ed11be30680bae5d5b2729298246aaebc7bf2011b806",
            transactionSignature:
                "1fa67277c19aaaa3317bbac44167d3671167e92d19b2d1a7ca2b2d364ccb75ad26cf5adbf3e33cc4c9ab58cf21dabc6e266c7a036cd94881164e883554c8520b",
            giftAny: {
                cipherPublicKeys: [],
                sourceChainMagic: "NCOH8",
                sourceChainName: "bfchain",
                parentAssetType: PARENT_ASSET_TYPE.ENTITY,
                assetType: "skyrim_dragonborn",
                amount: "1",
                totalGrabableTimes: 1,
                taxInformation: {
                    taxCollector: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                    taxAssetPrealnum: "1000",
                },
            },
            recipientId: "cLrUCNAWPyPH96bqqC3JQXZ3CtsvvXmNj1",
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.sendGrabAny(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
