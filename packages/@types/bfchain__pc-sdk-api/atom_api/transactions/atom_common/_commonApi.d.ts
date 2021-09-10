export declare abstract class CommonApi<T> {
    protected networkHelper: BFChainPcSdk.NetworkHelper;
    abstract readonly EXEC_API_PATH: BFChainPcSdk.Common.COMMON_API_PATH;
    constructor(networkHelper: BFChainPcSdk.NetworkHelper);
    sendPostRequest(argv: BFChainPcSdk.Common.CommonParams): Promise<BFChainPcSdk.TransactionServer.CommonSuccessReturn<T> | BFChainPcSdk.TransactionServer.CommonFailureReturn>;
}
