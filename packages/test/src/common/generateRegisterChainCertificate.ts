import * as fs from "node:fs";
import * as path from "node:path";
import { TRANSACTION_TYPES_BASE } from "@bfchain/core";
import { Api } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const genesisBlockPath = path.join(process.cwd(), "/genesisInfos/bfmtest-genesisBlock-testnet.json");
        if (!fs.existsSync(genesisBlockPath)) {
            throw new Error("创世块不存在");
        }
        const genesisBlock: BFChainCore.GenesisBlockJSON = JSON.parse(fs.readFileSync(genesisBlockPath, "utf-8"));
        const transactionInBlocks = genesisBlock.transactionInfo.transactionInBlocks;
        const { signature, asset } = genesisBlock;
        const { genesisAsset } = asset;
        const argv: TransactionMaker.Common.GenerateRegisterChainCertificateParams = {
            generatorSecret: "qqq",
            generatorSecondSecret: "www",
            genesisBlockInfo: {
                genesisBlockSignature: signature,
                chainName: genesisAsset.chainName,
                assetType: genesisAsset.assetType,
                magic: genesisAsset.magic,
                bnid: genesisAsset.bnid as any,
                beginEpochTime: genesisAsset.beginEpochTime,
                genesisLocationName: genesisAsset.genesisLocationName,
                blockPerRound: genesisAsset.blockPerRound,
                delegates: genesisAsset.delegates,
                forgeInterval: genesisAsset.forgeInterval,
                genesisDelegates: transactionInBlocks
                    .filter((tib) => tib.transaction.type.includes(TRANSACTION_TYPES_BASE.DELEGATE))
                    .map((tib) => {
                        return {
                            address: tib.transaction.senderId,
                            publicKey: tib.transaction.senderPublicKey,
                        };
                    }),
            },
        };

        const api = new Api();

        const result = await api.common.generateRegisterChainCertificate(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
