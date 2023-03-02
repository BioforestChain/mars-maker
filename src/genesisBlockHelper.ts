import * as path from "node:path";
import { BFChainGenesisInfo } from "@bfchain/coretools-obtain-genesis-info";

export class GenesisBlockHelper {
    private __INTERNAL_GENESIS_INFO_ROOT_PATH = path.join(__dirname, "assets/genesisInfos");
    private __IS_PRODUCTION = process.env.ENVIRONMENT_TYPE === "PRODUCTION" ? true : false;
    private _bfchainGenesisInfo: BFChainGenesisInfo;

    constructor(configOptions?: BFChainCoreTools.ConfigOptions) {
        this._bfchainGenesisInfo = new BFChainGenesisInfo(configOptions);
    }
    _genesisBlock: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> | undefined;
    get genesisBlockJson() {
        if (!this._genesisBlock) {
            const { genesisBlock } = this._bfchainGenesisInfo.getGenesisInfo(this.__IS_PRODUCTION ? this.__INTERNAL_GENESIS_INFO_ROOT_PATH : undefined);
            return (this._genesisBlock = genesisBlock);
        } else {
            return this._genesisBlock;
        }
    }

    get licenseJson() {
        const { license } = this._bfchainGenesisInfo.getGenesisInfo(this.__IS_PRODUCTION ? this.__INTERNAL_GENESIS_INFO_ROOT_PATH : undefined);
        return license;
    }
}
