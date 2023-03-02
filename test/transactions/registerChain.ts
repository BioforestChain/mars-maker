import * as fs from "node:fs";
import * as path from "node:path";
import { TRANSACTION_TYPES_BASE } from "@bfchain/core";
import { BFMetaTrMaker } from "@bfmeta/transaction-maker-api";

(async () => {
    try {
        const bfmetaTrMaker = new BFMetaTrMaker();

        const genesisBlockPath = path.join(process.cwd(), "/genesisInfos/bfmtest-genesisBlock-testnet.json");
        if (!fs.existsSync(genesisBlockPath)) {
            throw new Error("创世块不存在");
        }
        const genesisBlock: BFChainCore.GenesisBlockJSON = JSON.parse(fs.readFileSync(genesisBlockPath, "utf-8"));
        const transactionInBlocks = genesisBlock.transactionInfo.transactionInBlocks;
        const { signature, asset } = genesisBlock;
        const { genesisAsset } = asset;
        const argv1: TransactionMaker.Common.GenerateRegisterChainCertificateParams = {
            generatorSecret:
                "scan pass carpet coral pumpkin spell present decrease veteran text flower pioneer top speak jaguar wreck ask always hazard good know gift uncle frost",
            // generatorSecondSecret: "www",
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

        const result1 = await bfmetaTrMaker.common.generateRegisterChainCertificate(argv1);

        if (!result1.success) {
            console.log(result1);
            return;
        }

        const argv: TransactionMaker.Transaction.RegisterChainTransactionParams = {
            secret: "upgrade jump sugar congress glare expect other firm morning donate motor pride minute frame amount chimney wood gallery twelve barely dose blame convince enhance",
            fee: "1000",
            applyBlockHeight: 15,
            remark: { message: "create registerChain" },
            accountLastRoundInfo: {
                txCount: 0,
                equity: "8888888888888",
            },
            registerCertificate: result1.result,
        };

        const result = await bfmetaTrMaker.transaction.generateRegisterChain(argv);

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
