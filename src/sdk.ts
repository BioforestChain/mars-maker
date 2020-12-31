import { Injectable } from "@bfchain/util";
import { PcSDKExceptionGenerator } from "./helpers/moduleError/expceptionGenerator";
const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk", __filename);
import { WsManager } from "./network/wsManager";
import { CHAIN_API_PATH } from "./typings/enumTypes";

/**BFChainPC_SDK */
@Injectable()
export class BFChainPC_SDK {
    private __wsManager?: WsManager;
    constructor() {}

    /**
     * 初始化sdk，配置节点的网络信息
     * @param data
     */
    init(data: { ip: string; port: number; timeout: number }) {
        this.__wsManager = new WsManager(data.ip, data.port, data.timeout);
    }

    /**
     * 向节点发送api请求
     * @param api
     * @param data
     */
    private async __sendChainRequest(api: CHAIN_API_PATH, data: SDK.ApiRequest): Promise<any> {
        try {
            if (!this.__wsManager) {
                throw new BusinessCheckException(`__wsManager is undefined`);
            }
            const { success, message, result } = await this.__wsManager.socketEmit(api, data);
            if (!success) {
                throw new BusinessCheckException(message);
            }
            return result;
        } catch (e) {
            throw new BusinessCheckException(`__sendChainRequest api: ${api} fail. error: ${e.message}`);
        }
    }
}
