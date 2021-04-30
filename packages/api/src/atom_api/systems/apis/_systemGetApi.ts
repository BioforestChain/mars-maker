import { API_NAMESPACE, REQUEST_PROTOCOL, REQUEST_TYPE } from "@bfchain/pc-sdk-api-constants";

export abstract class SystemGetApi<T extends BFChainPcSdk.System.SystemApiRequestResult> {
    private readonly __API_NAMESPACE = API_NAMESPACE.SYSTEM;
    abstract readonly REQUEST_API_PATH: BFChainPcSdk.System.SYSTEM_API_PATH;

    constructor(protected networkHelper: BFChainPcSdk.NetworkHelper) {}

    async sendGetRequest(argv?: BFChainPcSdk.System.SystemApiRequestParams) {
        // FIXME: 兼容老燕辉设计的神奇的 api
        const apiPath = `${this.networkHelper.URL_PREFIX}${this.networkHelper.REQUEST_PROTOCOL === REQUEST_PROTOCOL.WEBSOCKET ? REQUEST_TYPE.GET + "/" : ""}${
            this.__API_NAMESPACE
        }${this.REQUEST_API_PATH}`;
        try {
            const result = await this.networkHelper.sendGetRequest<BFChainPcSdk.System.SystemApiReturn<T>>(apiPath, argv);
            return result;
        } catch (e) {
            const errorInfo: BFChainPcSdk.System.SystemApiFailureReturn = {
                success: false,
                error: {
                    code: "7001",
                    message: `request get api ${apiPath} error`,
                    description: e.message,
                },
            };
            return errorInfo;
        }
    }
}
