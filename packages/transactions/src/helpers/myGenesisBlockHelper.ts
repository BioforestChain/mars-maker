import { BNID_TYPE } from "@bfchain/core";
import { BFChainGenesisInfo } from "@bfchain/coretools-obtain-genesis-info";

export class MyGenesisBlockHelper {
    private configOptions: BFChainCoreTools.ConfigOptions = {
        bnidType: BNID_TYPE.TESTNET,
        chainName: "bfchain",
        chainAssetType: "bft",
        blockPerRound: 57,
        forgeInterval: 10,
    };

    private _bfchainGenesisInfo: BFChainGenesisInfo;

    constructor(blockPerRound = 57, forgeInterval = 10) {
        this.configOptions.blockPerRound = blockPerRound;
        this.configOptions.forgeInterval = forgeInterval;

        this._bfchainGenesisInfo = new BFChainGenesisInfo(this.configOptions);
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
