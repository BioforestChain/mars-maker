import { Injectable, Resolve } from "@bfchain/util";
import { PcSDKExceptionGenerator } from "./helpers/moduleError/expceptionGenerator";
const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk", __filename);
import { NetworkHelper } from "./network/networkHelper";
import { BASIC_API } from "./api";
import { ApiType } from "./api/apiConst";

/**BFChainPC_SDK */
@Injectable()
export class BFChainPC_SDK {
    constructor(private __networkHelper: NetworkHelper, private __getLastBlock: BASIC_API.GetLastBlock, private __getBlock: BASIC_API.GetBlock) {}

    /**
     * 初始化sdk，配置节点的网络信息
     * @param apiType
     * @param data
     */
    init(apiType: ApiType, data: { ip: string; port: number; timeout?: number }) {
        this.__networkHelper.init(apiType, data);
    }

    /**获取本地节点当前最新区块 */
    async getLastBlock(): Promise<SDK.ApiResp.BASIC.GetLastBlock> {
        return await this.__getLastBlock.sendRequest(undefined);
    }

    /**获取指定区块 */
    async getBlock(request: SDK.ApiRequest.BASIC.GetBlock): Promise<SDK.ApiResp.BASIC.GetBlock> {
        return await this.__getBlock.sendRequest(request);
    }
}
