declare namespace BFMetaPcSdk {
    interface GenesisInfoConfig {
        isGenesisBlockProvidedExternally: boolean;
        networkType: BFMetaPcSdk.BLOCK_CHAIN_NET_WORK_TYPE;
        chainAssetType: string;
        blockPerRound: number;
        forgeInterval: number;
        genesisBlockRootPath?: string;
    }
    type GenesisInfoConfigOptions = Partial<GenesisInfoConfig>;
    interface TransactionConfig {
        configRootPath?: string;
        genesisInfoConfig: GenesisInfoConfig;
        lang: BFMetaPcSdk.SECRET_LANGUAGE_TYPE;
    }
    type TransactionConfigOptions = AllPartial<TransactionConfig>;
}
