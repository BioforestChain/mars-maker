import { HttpHelper, WebsocketHelper } from "./network";
import { REQUEST_PROTOCOL } from "@bfchain/pc-sdk-api-constants";
import { BasicApi, SystemApi, TransactionApi } from "./atom_api";
import { ApiConfigHelper } from "@bfchain/pc-sdk-helper-api-config";

export class Api {
    private __configHelper: ApiConfigHelper;
    private __basicApi!: BasicApi;
    private __systemApi!: SystemApi;
    private __transactionApi!: TransactionApi;

    constructor(transactionServerPort: number, configOptions?: BFChainPcSdk.ApiConfigOptions) {
        this.__configHelper = new ApiConfigHelper(configOptions);
        const apiConfig = this.__configHelper.apiConfig;
        let networkHelper: BFChainPcSdk.NetworkHelper;
        if (apiConfig.requestProtocol == REQUEST_PROTOCOL.HTTP) {
            networkHelper = new HttpHelper(transactionServerPort, this.__configHelper);
        } else {
            networkHelper = new WebsocketHelper(transactionServerPort, this.__configHelper);
        }

        this.__basicApi = new BasicApi(networkHelper);
        this.__systemApi = new SystemApi(networkHelper);
        this.__transactionApi = new TransactionApi(networkHelper);
    }

    get config() {
        return this.__configHelper.apiConfig;
    }

    get basic() {
        return this.__basicApi;
    }

    get system() {
        return this.__systemApi;
    }

    get transaction() {
        return this.__transactionApi;
    }
}
