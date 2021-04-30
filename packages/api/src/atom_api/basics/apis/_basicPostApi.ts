import { API_NAMESPACE, REQUEST_PROTOCOL, REQUEST_TYPE } from "@bfchain/pc-sdk-api-constants";

export abstract class BasicPostApi<T extends BFChainPcSdk.Basic.BasicApiRequestResult> {
    private readonly __API_NAMESPACE = API_NAMESPACE.BASIC;
    abstract readonly REQUEST_API_PATH: BFChainPcSdk.Basic.BASIC_API_PATH;

    constructor(protected networkHelper: BFChainPcSdk.NetworkHelper) {}

    async sendPostRequest(argv: BFChainPcSdk.Basic.BasicApiRequestParams) {
        // FIXME: 兼容老燕辉设计的神奇的 api
        const apiPath = `${this.networkHelper.URL_PREFIX}${this.networkHelper.REQUEST_PROTOCOL === REQUEST_PROTOCOL.WEBSOCKET ? REQUEST_TYPE.POST + "/" : ""}${
            this.__API_NAMESPACE
        }${this.REQUEST_API_PATH}`;
        try {
            const result = await this.networkHelper.sendPostRequest<BFChainPcSdk.Basic.BasicApiReturn<T>>(apiPath, argv);
            return result;
        } catch (e) {
            const errorInfo: BFChainPcSdk.Basic.BasicApiFailureReturn = {
                success: false,
                error: {
                    code: "7001",
                    message: `request post api ${apiPath} error`,
                    description: e.message,
                },
            };
            return errorInfo;
        }
    }
}
