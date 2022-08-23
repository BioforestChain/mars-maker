declare namespace BFChainPcSdk {
    interface Config {
        /**配置文件的根路径，如果提供的路径不存在会使用默认路径 */
        configRootPath?: string;
        /**创世块的根路径，如果 isGenesisBlockProvidedExternally，并且配置了 genesisBlockRootPath，则从此目录搜索创世块 */
        genesisBlockRootPath?: string;
        /**api 配置信息 */
        apiConfig: ApiConfig;
        /**交易服务端口号, 默认值 8888 */
        transactionServerPort: number;
        /**交易配置信息 */
        transactionConfig: TransactionConfig;
    }

    interface ConfigOptions {
        /**配置文件的根路径，如果提供的路径不存在会使用默认路径 */
        configRootPath?: string;
        /**创世块的根路径，如果 isGenesisBlockProvidedExternally，并且配置了 genesisBlockRootPath，则从此目录搜索创世块 */
        genesisBlockRootPath?: string;
        /**api 配置信息 */
        apiConfig?: ApiConfigOptions;
        /**交易服务端口号, 默认值 8888 */
        transactionServerPort?: number;
        /**交易配置信息 */
        transactionConfig?: TransactionConfigOptions;
        /**创世块 */
        genesisBlock?: BFChainCore.GenesisBlockJSON;
    }
}
