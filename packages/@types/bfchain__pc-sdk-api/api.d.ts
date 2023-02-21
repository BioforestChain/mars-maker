import { BasicApi, SystemApi, TransactionApi } from "./atom_api";
export declare class Api {
    private __configHelper;
    private __basicApi;
    private __systemApi;
    private __transactionApi;
    constructor(transactionServerPort: number, configOptions?: BFMetaPcSdk.ApiConfigOptions);
    get config(): BFMetaPcSdk.ApiConfig;
    get basic(): BasicApi;
    get system(): SystemApi;
    get transaction(): TransactionApi;
    setApiconfig(configOptions: BFMetaPcSdk.ApiConfigOptions): void;
}
