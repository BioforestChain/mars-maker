import { BasicApi, SystemApi, TransactionApi } from "./atom_api";
export declare class Api {
    private __configHelper;
    private __basicApi;
    private __systemApi;
    private __transactionApi;
    constructor(transactionServerPort: number, configOptions?: BFChainPcSdk.ApiConfigOptions);
    get config(): BFChainPcSdk.ApiConfig;
    get basic(): BasicApi;
    get system(): SystemApi;
    get transaction(): TransactionApi;
    setApiconfig(configOptions: BFChainPcSdk.ApiConfigOptions): void;
}
