declare namespace BFChainPcSdk {
    interface GenesisInfoConfig {
        /**创世块是否由外部提供, 默认在 genesisInfos 目录, 默认值 false */
        isGenesisBlockProvidedExternally: boolean;
        /**网络类型: testnet || mainnet, 默认值 mainnet */
        networkType: BFChainPcSdk.BLOCK_CHAIN_NET_WORK_TYPE;
        /**区块链链权益名, 默认值 BFT */
        chainAssetType: string;
        /**每轮的区块数量, 默认值 57 */
        blockPerRound: number;
        /**锻造区块的时间间隔, 默认值 128 */
        forgeInterval: number;
        /**创世块的根路径，如果 isGenesisBlockProvidedExternally，并且配置了 genesisBlockRootPath，则从此目录搜索创世块 */
        genesisBlockRootPath?: string;
    }

    type GenesisInfoConfigOptions = Partial<GenesisInfoConfig>;

    interface TransactionConfig {
        /**创世块配置信息 */
        genesisInfoConfig: GenesisInfoConfig;
        /**密码类型: cn 汉语 || jp 日语 || sp 西班牙语 || it 意大利语 || fr 法语 || en 英语, 默认值 en */
        lang: BFChainPcSdk.SECRET_LANGUAGE_TYPE;
    }

    type TransactionConfigOptions = AllPartial<TransactionConfig>;
}
