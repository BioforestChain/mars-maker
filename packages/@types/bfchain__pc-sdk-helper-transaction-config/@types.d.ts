declare namespace BFChainPcSdk {
    interface GenesisInfoConfig {
        isGenesisBlockProvidedExternally: boolean;
        networkType: BFChainPcSdk.BLOCK_CHAIN_NET_WORK_TYPE;
        chainAssetType: string;
        blockPerRound: number;
        forgeInterval: number;
        genesisBlockRootPath?: string;
    }
    type GenesisInfoConfigOptions = Partial<GenesisInfoConfig>;
    interface TransactionConfig {
        configRootPath?: string;
        genesisInfoConfig: GenesisInfoConfig;
        lang: BFChainPcSdk.SECRET_LANGUAGE_TYPE;
    }
    type TransactionConfigOptions = AllPartial<TransactionConfig>;
}
