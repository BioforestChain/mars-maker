export declare abstract class BasicPostApi<T extends BFMetaPcSdk.Basic.BasicApiRequestResult> {
    protected networkHelper: BFMetaPcSdk.NetworkHelper;
    private readonly __API_NAMESPACE;
    abstract readonly REQUEST_API_PATH: BFMetaPcSdk.Basic.BASIC_API_PATH;
    constructor(networkHelper: BFMetaPcSdk.NetworkHelper);
    sendPostRequest(argv: BFMetaPcSdk.Basic.BasicApiRequestParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<T>>;
}
