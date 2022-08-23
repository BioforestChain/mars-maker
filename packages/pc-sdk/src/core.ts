import { Api } from "@bfchain/pc-sdk-api";
import { TransactionServer } from "@bfchain/pc-sdk-transactions-server";

export class Sdk {
    private __transactionServer = new TransactionServer();
    private __transactionServerPort = this.__transactionServer.getTransactionServerPort();
    private __api: Api;
    private __configOptions: BFChainPcSdk.ConfigOptions = {};
    constructor(configOptions?: BFChainPcSdk.ConfigOptions) {
        if (configOptions) {
            if (configOptions.transactionServerPort !== undefined) {
                this.__transactionServerPort = configOptions.transactionServerPort;
            }
            this.__configOptions = configOptions;
        }
        const configRootPath = this.__configOptions.configRootPath;
        const apiConfig = this.__configOptions.apiConfig;
        this.__api = new Api(
            this.__transactionServerPort,
            configRootPath
                ? apiConfig
                    ? {
                          ...apiConfig,
                          configRootPath,
                      }
                    : {
                          configRootPath,
                      }
                : apiConfig
        );
    }

    get api() {
        return this.__api;
    }

    setApiConfig(configOptions: BFChainPcSdk.ApiConfigOptions) {
        this.api.setApiconfig(configOptions);
    }

    /**
     * 事件服务器时间校正
     *
     * @param timeOffset 偏移量 ms
     */
    correctTransactionServerTime(timeOffset: number) {
        this.__transactionServer.timeCorrecting(timeOffset);
    }

    /**
     * 运行交易服务器
     *
     * @param configOptions
     */
    async runTransactionServer(configOptions?: BFChainPcSdk.TransactionConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        configOptions = configOptions || this.__configOptions.transactionConfig || {};
        if (this.__configOptions.configRootPath) {
            configOptions.configRootPath = this.__configOptions.configRootPath;
        }
        if (this.__configOptions.genesisBlockRootPath) {
            configOptions.genesisInfoConfig = configOptions.genesisInfoConfig || {};
            configOptions.genesisInfoConfig.genesisBlockRootPath = this.__configOptions.genesisBlockRootPath;
        }
        await this.__transactionServer.runTransactionServer(this.__transactionServerPort, configOptions, genesisBlock || this.__configOptions.genesisBlock);
    }
}
