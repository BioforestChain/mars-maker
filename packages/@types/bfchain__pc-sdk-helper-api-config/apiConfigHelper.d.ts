export declare class ApiConfigHelper {
    private __apiConfig;
    constructor(configOptions?: BFMetaPcSdk.ApiConfigOptions);
    private __initConfig;
    setApiConfig(apiConfigOptions: BFMetaPcSdk.ApiConfigOptions): void;
    get apiConfig(): BFMetaPcSdk.ApiConfig;
}
