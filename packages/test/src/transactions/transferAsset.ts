import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams = {
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
                assetType: "BFT",
                amount: "10000",
            },
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
        };

        const sdk = new Sdk({ transactionServerPort: 8888 });

        const result = await sdk.api.transaction.generateTransferAsset(argv);

        if (result.success) {
            console.log(result.result.asset.transferAsset);
        }

        const sdk2 = new Sdk({ transactionServerPort: 9999 });

        const result2 = await sdk2.api.transaction.generateTransferAsset(argv);

        if (result2.success) {
            console.log(result2.result.asset.transferAsset);
        }

        // console.log(result);
    } catch (e) {
        console.log(e);
    }
})();
