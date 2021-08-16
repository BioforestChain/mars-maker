export declare class ApiConfigHelper {
    private __apiConfig;
    constructor(configOptions?: BFChainPcSdk.ApiConfigOptions);
    private __initConfig;
    setApiConfig(apiConfigOptions: BFChainPcSdk.ApiConfigOptions): void;
    get apiConfig(): BFChainPcSdk.ApiConfig;
}
