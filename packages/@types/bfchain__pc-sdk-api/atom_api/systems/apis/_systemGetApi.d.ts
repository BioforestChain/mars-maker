export declare abstract class SystemGetApi<T extends BFChainPcSdk.System.SystemApiRequestResult> {
    protected networkHelper: BFChainPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly REQUEST_API_PATH: BFChainPcSdk.System.SYSTEM_API_PATH;
    constructor(networkHelper: BFChainPcSdk.NetworkHelper);
    sendGetRequest(argv?: BFChainPcSdk.System.SystemApiRequestParams): Promise<BFChainPcSdk.System.SystemApiReturn<T>>;
}
