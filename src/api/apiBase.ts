import { Injectable, Inject } from "@bfchain/util";
import { NetworkHelper } from "../network/networkHelper";

/**接口基类 */
@Injectable()
export abstract class ApiBase {
    @Inject(NetworkHelper)
    private __networkHelper!: NetworkHelper;

    constructor(protected __apiInfo: SDK.ApiInfo) {}

    getApiInfo() {
        return this.__apiInfo;
    }

    /**
     * 接口名称
     */
    getName() {
        return this.__apiInfo.name;
    }

    /**
     * http的Method，[GET,POST,PUT...]
     */
    getMethod() {
        return this.__apiInfo.method ?? "";
    }

    /**
     * 接口前缀
     */
    abstract getPrefix();

    /**
     * http接口的完整路径
     */
    getPath() {
        return `${this.getPrefix()}/${this.getName()}`;
    }

    /**
     * websocket接口的完整路径
     */
    getWsPath() {
        return `${this.getMethod()}${this.getPath()}`;
    }

    /**
     * 向节点发送api请求
     * @param request
     */
    async sendRequest<RequestType, RespType>(request: RequestType): Promise<RespType> {
        return await this.__networkHelper.sendRequest(this.getWsPath(), request);
    }
}
