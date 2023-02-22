import { BNID_TYPE } from "@bfchain/core";
import { BFChainGenesisInfo } from "@bfchain/coretools-obtain-genesis-info";

export class GenesisBlockHelper {
    private _bfchainGenesisInfo: BFChainGenesisInfo;

    constructor(configOptions?: BFChainCoreTools.ConfigOptions) {
        this._bfchainGenesisInfo = new BFChainGenesisInfo(configOptions);
    }
    _genesisBlock: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> | undefined;
    get genesisBlockJson() {
        if (!this._genesisBlock) {
            const { genesisBlock } = this._bfchainGenesisInfo.getGenesisInfo();
            return (this._genesisBlock = genesisBlock);
        } else {
            return this._genesisBlock;
        }
    }

    get licenseJson() {
        const { license } = this._bfchainGenesisInfo.getGenesisInfo();
        return license;
    }
}
