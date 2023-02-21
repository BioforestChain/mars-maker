declare namespace BFMetaPcSdk {
    interface ApiConfig {
        configRootPath?: string;
        ips: string[];
        port: number;
        requestTimeOut: number;
        requestProtocol: BFMetaPcSdk.REQUEST_PROTOCOL;
    }
    type ApiConfigOptions = Partial<ApiConfig>;
}
