export declare abstract class SystemGetApi<T extends BFMetaPcSdk.System.SystemApiRequestResult> {
    protected networkHelper: BFMetaPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly REQUEST_API_PATH: BFMetaPcSdk.System.SYSTEM_API_PATH;
    constructor(networkHelper: BFMetaPcSdk.NetworkHelper);
    sendGetRequest(argv?: BFMetaPcSdk.System.SystemApiRequestParams): Promise<BFMetaPcSdk.System.SystemApiReturn<T>>;
}
