declare namespace BFChainPcSdk {
    interface ApiConfig {
        configRootPath?: string;
        ips: string[];
        port: number;
        requestTimeOut: number;
        requestProtocol: BFChainPcSdk.REQUEST_PROTOCOL;
    }
    type ApiConfigOptions = Partial<ApiConfig>;
}
