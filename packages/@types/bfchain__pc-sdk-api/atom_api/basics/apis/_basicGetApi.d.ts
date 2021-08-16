export declare abstract class BasicGetApi<T extends BFChainPcSdk.Basic.BasicApiRequestResult> {
    protected networkHelper: BFChainPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly REQUEST_API_PATH: BFChainPcSdk.Basic.BASIC_API_PATH;
    constructor(networkHelper: BFChainPcSdk.NetworkHelper);
    sendGetRequest(argv?: BFChainPcSdk.Basic.BasicApiRequestParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<T>>;
}
