import * as fs from "node:fs";
import * as path from "node:path";
import { Injectable } from "@bfchain/util-dep-inject";
import { SECRET_LANGUAGE_TYPE, LOGGER_LEVEL } from "@bfmeta/transaction-maker-core";

@Injectable()
export class Config {
    private __config: TransactionMaker.Server.Config = {
        port: 8888,
        loggerConfig: {
            level: LOGGER_LEVEL.ERROR,
            limit: 100,
            backup: 100,
            dateExpire: false,
            daysToRotate: 30,
        },
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

    setLoggerConfig(loggerConfigOptions: TransactionMaker.Server.LoggerConfigOptions) {
        const { level, limit, backup, dateExpire, daysToRotate } = loggerConfigOptions;
        level !== undefined && (this.__config.loggerConfig.level = level);
        limit !== undefined && (this.__config.loggerConfig.limit = limit);
        backup !== undefined && (this.__config.loggerConfig.backup = backup);
        dateExpire !== undefined && (this.__config.loggerConfig.dateExpire = dateExpire);
        daysToRotate !== undefined && (this.__config.loggerConfig.daysToRotate = daysToRotate);
    }

    setConfig(configOptions: TransactionMaker.Server.ConfigOptions) {
        const { port, loggerConfig, chainNodeIps, broadcastTimeout, genesisInfoConfig, lang } = configOptions;
        port !== undefined && (this.__config.port = port);
        chainNodeIps !== undefined && (this.__config.chainNodeIps = chainNodeIps);
        broadcastTimeout !== undefined && (this.__config.broadcastTimeout = broadcastTimeout);
        lang !== undefined && (this.__config.lang = lang);
        loggerConfig !== undefined && this.setLoggerConfig(loggerConfig);
        genesisInfoConfig !== undefined && this.setGenesisInfoConfig(genesisInfoConfig);
    }

    get config() {
        return this.__config;
    }
}
