import { PARENT_ASSET_TYPE } from "@bfmeta/transaction-maker-core";
import { Api } from "@bfmeta/transaction-maker-api";
import { utils } from "../utils";

(async () => {
    try {
        const config: TransactionMaker.Api.ConfigOptions = {
            ips: ["127.0.0.1:8888"],
            requestTimeout: 10000,
        };

        const ipInfo: TransactionMaker.IpInfo = {
            ip: "127.0.0.1:8888",
            nodeIp: "127.0.0.1",
        };

        const api = new Api();

        await api.common.timeCorrecting({
            ip: ipInfo.nodeIp,
        });

        const blobInfo = utils.getSha256BlobInfo("/assets/sodium.node");
        const seedResult = await api.common.generateBlobSeed(blobInfo);

        if (!seedResult.success) {
            console.log(seedResult);
            return;
        }

        const argv: TransactionMaker.Transaction.TransferAnyTransactionParams = {
            secret: "nose install correct solar side latin focus churn mask nominee differ mosquito claw awake glass rare pond clump draw rent fiction muscle razor bacon",
            // secondSecretInfo: {
            //     useOld: false,
            //     secondSecret: "i am the future",
            // },
            fee: "20000000",
            applyBlockHeight: 1,
            remark: {
                message: "create transferAsset",
                blobSeed: seedResult.result,
            },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            assetInfo: {
                parentAssetType: PARENT_ASSET_TYPE.ASSETS,
                assetType: "BFMTEST",
                amount: "1000",
            },
            recipientId: "cCET2Sxt2LPDhx44wxJ9uhkpviKNrSacvE",
        };

        // const result = await api.transaction.generateTransferAny(argv, ipInfo.ip);

        // if (result.success) {
        //     const resp = await api.transaction.broadcastTransaction({
        //         transaction: result.result,
        //         ip: ipInfo.nodeIp,
        //     });
        //     if (resp.success) {
        //         console.log(resp.result);
        //     } else {
        //         console.log(resp);
        //     }
        // } else {
        //     console.log(result);
        // }

        const result = await api.transaction.sendTransferAny(argv, ipInfo);
        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
