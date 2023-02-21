import * as fs from "fs";
import * as path from "path";
import { Injectable } from "@bfchain/util-dep-inject";
import { BLOCK_CHAIN_NET_WORK_TYPE, SECRET_LANGUAGE_TYPE } from "@bfchain/pc-sdk-api-constants";

@Injectable()
export class TransactionConfigHelper {
    private __transactionConfig!: BFMetaPcSdk.TransactionConfig;

    constructor(configOptions?: BFMetaPcSdk.TransactionConfigOptions) {
        this.__initConfig(configOptions && configOptions.configRootPath);
        configOptions && this.setTransactionConfig(configOptions);
    }

    private __initConfig(configRootPath?: string) {
        this.__transactionConfig = {
            genesisInfoConfig: {
                isGenesisBlockProvidedExternally: false,
                networkType: BLOCK_CHAIN_NET_WORK_TYPE.MAINNET,
                chainAssetType: "bft",
                blockPerRound: 57,
                forgeInterval: 128,
            },
            lang: SECRET_LANGUAGE_TYPE.ENGLISH,
        };

        const configPath = path.join(configRootPath || path.join(process.cwd(), "config"), "config.json");
        if (fs.existsSync(configPath)) {
            const configData: {
                transactionConfig: BFMetaPcSdk.TransactionConfigOptions;
            } = JSON.parse(fs.readFileSync(configPath).toString());
            if (configData.transactionConfig) {
                this.setTransactionConfig(configData.transactionConfig);
            }
        }
    }

    setGenesisInfoConfig(genesisInfoConfigOptions: BFMetaPcSdk.GenesisInfoConfigOptions) {
        if (!this.__transactionConfig) {
            this.__initConfig();
        }
        const { isGenesisBlockProvidedExternally, networkType, chainAssetType, blockPerRound, forgeInterval, genesisBlockRootPath } = genesisInfoConfigOptions;
        isGenesisBlockProvidedExternally !== undefined &&
            (this.__transactionConfig.genesisInfoConfig.isGenesisBlockProvidedExternally = isGenesisBlockProvidedExternally);
        networkType !== undefined && (this.__transactionConfig.genesisInfoConfig.networkType = networkType);
        chainAssetType !== undefined && (this.__transactionConfig.genesisInfoConfig.chainAssetType = chainAssetType);
        blockPerRound !== undefined && (this.__transactionConfig.genesisInfoConfig.blockPerRound = blockPerRound);
        forgeInterval !== undefined && (this.__transactionConfig.genesisInfoConfig.forgeInterval = forgeInterval);
        genesisBlockRootPath !== undefined && (this.__transactionConfig.genesisInfoConfig.genesisBlockRootPath = genesisBlockRootPath);
    }

    setTransactionConfig(transactionConfigOptions: BFMetaPcSdk.TransactionConfigOptions) {
        if (!this.__transactionConfig) {
            this.__initConfig();
        }
        const { genesisInfoConfig, lang } = transactionConfigOptions;
        lang !== undefined && (this.__transactionConfig.lang = lang);
        genesisInfoConfig !== undefined && this.setGenesisInfoConfig(genesisInfoConfig);
    }

    get transactionConfig() {
        if (!this.__transactionConfig) {
        }
        return this.__transactionConfig;
    }
}
