import * as fs from "node:fs";
import * as path from "node:path";
import { Injectable } from "@bfchain/util-dep-inject";
import { BLOCK_CHAIN_NET_WORK_TYPE, SECRET_LANGUAGE_TYPE } from "@bfmeta/transaction-maker-core";

@Injectable()
export class Config {
    private __config: TransactionMaker.Server.Config = {
        port: 8888,
        chainNodeIps: ["127.0.0.1"],
        broadcastTimeout: 30000,
        genesisInfoConfig: {
            isGenesisBlockProvidedExternally: false,
            networkType: BLOCK_CHAIN_NET_WORK_TYPE.MAINNET,
            chainName: "bfchain",
            chainAssetType: "bft",
            blockPerRound: 57,
            forgeInterval: 128,
        },
        lang: SECRET_LANGUAGE_TYPE.ENGLISH,
    };

    constructor(configOptions?: TransactionMaker.Server.ConfigOptions) {
        const configPath = path.join(process.cwd(), "/config/config.json");
        if (fs.existsSync(configPath)) {
            this.setConfig(JSON.parse(fs.readFileSync(configPath, "utf-8")));
        }
        configOptions && this.setConfig(configOptions);
    }

    setGenesisInfoConfig(genesisInfoConfigOptions: TransactionMaker.Server.GenesisInfoConfigOptions) {
        const { isGenesisBlockProvidedExternally, networkType, chainName, chainAssetType, blockPerRound, forgeInterval, genesisBlockRootPath } =
            genesisInfoConfigOptions;
        isGenesisBlockProvidedExternally !== undefined && (this.__config.genesisInfoConfig.isGenesisBlockProvidedExternally = isGenesisBlockProvidedExternally);
        networkType !== undefined && (this.__config.genesisInfoConfig.networkType = networkType);
        chainName !== undefined && (this.__config.genesisInfoConfig.chainName = chainName);
        chainAssetType !== undefined && (this.__config.genesisInfoConfig.chainAssetType = chainAssetType);
        blockPerRound !== undefined && (this.__config.genesisInfoConfig.blockPerRound = blockPerRound);
        forgeInterval !== undefined && (this.__config.genesisInfoConfig.forgeInterval = forgeInterval);
        genesisBlockRootPath !== undefined && (this.__config.genesisInfoConfig.genesisBlockRootPath = genesisBlockRootPath);
    }

    setConfig(configOptions: TransactionMaker.Server.ConfigOptions) {
        const { port, chainNodeIps, broadcastTimeout, genesisInfoConfig, lang } = configOptions;
        port !== undefined && (this.__config.port = port);
        chainNodeIps !== undefined && (this.__config.chainNodeIps = chainNodeIps);
        broadcastTimeout !== undefined && (this.__config.broadcastTimeout = broadcastTimeout);
        lang !== undefined && (this.__config.lang = lang);
        genesisInfoConfig !== undefined && this.setGenesisInfoConfig(genesisInfoConfig);
    }

    get config() {
        return this.__config;
    }
}
