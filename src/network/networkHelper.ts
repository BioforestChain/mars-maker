import { PcSDKExceptionGenerator } from "../helpers/moduleError/expceptionGenerator";
const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:network", __filename);
import { WsManager } from "../network/wsManager";
import { CHAIN_API_PATH } from "../typings/enumTypes";
import { ApiBase } from "../api/apiBase";
import { ApiType } from "../constants";

/**网络层 */
class NetworkHelper {
    private __wsManager?: WsManager;
    private __apiType?: ApiType;

    constructor() {}

    /**
     * 初始化sdk，配置节点的网络信息
     * @param apiType
     * @param data
     */
    init(apiType: ApiType, data: { ip: string; port: number; timeout?: number }) {
        this.__apiType = apiType;
        switch (apiType) {
            case ApiType.WS:
                this.__wsManager = new WsManager(data.ip, data.port, data.timeout ?? 10000);
                break;
            default:
                break;
        }
    }

    /**
     * 向节点发送api请求
     * @param api
     * @param request
     */
    async sendRequest(api: ApiBase, request?: BFChainPcSdk.PcApiRequest) {
        switch (this.__apiType) {
            case ApiType.WS:
                return await this.__sendWsRequest(api.getWsPath(), request);
            default:
                break;
        }
        throw new BusinessCheckException(`sendRequest api: ${api.getName()} fail. apiType:${this.__apiType} is invalid`);
    }

    /**
     * 用websocket向节点发送api请求
     * @param path
     * @param request
     */
    private async __sendWsRequest(path: string, request?: BFChainPcSdk.PcApiRequest): Promise<BFChainPcSdk.SDKReturn> {
        try {
            if (!this.__wsManager) {
                throw new BusinessCheckException(`__wsManager is undefined`);
            }
            const result = await this.__wsManager.socketEmit(path, request);
            return result;
        } catch (e) {
            throw new BusinessCheckException(`sendChainRequest api: ${path} fail. error: ${e.message}`);
        }
    }
}

export const networkHelper = new NetworkHelper();
