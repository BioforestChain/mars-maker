import * as fs from "node:fs";
import * as path from "node:path";
import { Injectable } from "@bfchain/util-dep-inject";
import { SECRET_LANGUAGE_TYPE } from "@bfmeta/transaction-maker-core";

@Injectable()
export class Config {
    private __config: TransactionMaker.Server.Config = {
        port: 8888,
        chainNodeIps: ["127.0.0.1"],
        broadcastTimeout: 30000,
        genesisInfoConfig: {
            genesisBlockPath: "genesisInfos/bfmtest-genesisBlock-testnet.json",
            genesisBlockLicensePath: "genesisInfos/bfmtest-lincense-testnet.json",
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
        const { genesisBlockPath, genesisBlockLicensePath } = genesisInfoConfigOptions;
        genesisBlockPath !== undefined && (this.__config.genesisInfoConfig.genesisBlockPath = genesisBlockPath);
        genesisBlockLicensePath !== undefined && (this.__config.genesisInfoConfig.genesisBlockLicensePath = genesisBlockLicensePath);
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
