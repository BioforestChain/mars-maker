import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            // secondSecretInfo: {
            //     useOld: false,
            //     secondSecret: "i am the future",
            // },
            fee: "1000",
            applyBlockHeight: 1,
            remark: { message: "create transferAsset" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                parentAssetType: PARENT_ASSET_TYPE.ENTITY,
                assetType: "skyrim_dragonborn",
                amount: "10000",
            },
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
            taxInformation: {
                taxCollector: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
                taxAssetPrealnum: "1000",
            },
        };

        const sdk = new Sdk();

        const result = await sdk.api.transaction.generateTransferAny(argv);

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
