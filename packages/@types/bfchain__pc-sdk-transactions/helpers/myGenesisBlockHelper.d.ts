export declare class MyGenesisBlockHelper {
    private configOptions;
    private _bfchainGenesisInfo;
    constructor(blockPerRound?: number, forgeInterval?: number);
    _genesisBlock: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> | undefined;
    get genesisBlockJson(): BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>;
    get licenseJson(): BFChainLicense.LicenseJSON;
}
