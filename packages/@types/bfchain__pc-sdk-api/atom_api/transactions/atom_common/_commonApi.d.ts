export declare abstract class CommonApi<T> {
    protected networkHelper: BFMetaPcSdk.NetworkHelper;
    abstract readonly EXEC_API_PATH: BFMetaPcSdk.Common.COMMON_API_PATH;
    constructor(networkHelper: BFMetaPcSdk.NetworkHelper);
    sendPostRequest(argv: BFMetaPcSdk.Common.CommonParams): Promise<BFMetaPcSdk.TransactionServer.CommonSuccessReturn<T> | BFMetaPcSdk.TransactionServer.CommonFailureReturn>;
}
