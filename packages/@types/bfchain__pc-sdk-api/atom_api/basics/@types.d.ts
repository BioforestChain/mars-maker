declare namespace BFChainPcSdk {
    namespace Basic {
        type TRANSACTION_TYPES_BASE = import("@bfchain/core").TRANSACTION_TYPES_BASE;
        interface BasicApiRequestParams {
        }
        interface GetBlockParams extends BasicApiRequestParams {
            signature?: string;
            height?: number;
            page?: number;
        }
        interface GetTransactionTypeParams extends BasicApiRequestParams {
            baseType: TRANSACTION_TYPES_BASE;
        }
        interface GetTransactionsParams extends BasicApiRequestParams {
            signature?: string;
            height?: number;
            minHeight?: number;
            maxHeight?: number;
            senderId?: string;
            recipientId?: string;
            type?: string[];
            page?: number;
        }
        interface GenerateSecretParams extends BasicApiRequestParams {
            lang: string;
        }
        interface CreateAccountParams extends BasicApiRequestParams {
            secret: string;
        }
        interface GetAccountPublicKeyParams extends BasicApiRequestParams {
            address: string;
        }
        interface GetAccountLastTransactionParams extends BasicApiRequestParams {
            address: string;
            assetType: string;
        }
        interface GetAccountLastTypeTransactionParams extends BasicApiRequestParams {
            address: string;
            transactionType: string;
        }
        interface SetKVStorageTempParams extends BasicApiRequestParams {
            datas: Uint8Array[];
        }
        interface GetKVStorageParams extends BasicApiRequestParams {
            key: string;
        }
        interface BasicApiRequestResult {
        }
        interface GetBlockResult extends BasicApiRequestResult {
            blocks: BFChainCore.BlockJSON[];
            count: number;
            cmdLimitPerQuery: number;
        }
        type GetLastBlockResult = BFChainCore.LastBlockInfo<any>;
        interface GetTransactionTypeResult extends BasicApiRequestResult {
            type: string;
        }
        interface GetTransactionsResult extends BasicApiRequestResult {
            trs: BFChainCore.TransactionInBlockJSON[];
            count: number;
            cmdLimitPerQuery: number;
        }
        interface GenerateSecretResult extends BasicApiRequestResult {
            secret: string;
        }
        interface CreateAccountResult extends BasicApiRequestResult {
            address: string;
            publicKey: string;
            secretKey: string;
        }
        interface GetAccountPublicKeyResult extends BasicApiRequestResult {
            publicKey?: string;
        }
        interface GetBfchainVersionResult extends BasicApiRequestResult {
            version: string;
        }
        interface GetBlockChainStatusResult extends BasicApiRequestResult {
            status: BFChainCore.BlockchainStatusJSON["status"];
            peers: number;
            isReady: boolean;
            serverTimestamp: number;
        }
        interface GetAccountLastTransactionResult extends BasicApiRequestResult {
            transactionInBlock?: BFChainCore.TransactionInBlockJSON;
            assetIndex?: {
                [assetType: string]: number;
            };
            block?: BFChainCore.BlockJSON;
        }
        interface GetAccountLastTypeTransactionResult extends BasicApiRequestResult {
            transactionInBlock?: BFChainCore.TransactionInBlockJSON;
        }
        interface SetKVStorageTempResult extends BasicApiRequestResult {
            keys: string[];
        }
        interface GetKVStorageResult extends BasicApiRequestResult {
            data: Uint8Array;
        }
        interface BasicApiSuccessReturn<T extends BasicApiRequestResult> extends ApiSuccessReturn {
            result: T;
        }
        interface BasicApiFailureReturn extends ApiFailureReturn {
        }
        type BasicApiReturn<T extends BasicApiRequestResult> = BasicApiSuccessReturn<T> | BasicApiFailureReturn;
        type BasicApi = import("./apis/_basicGetApi").BasicGetApi<any> | import("./apis/_basicPostApi").BasicPostApi<any>;
        type GetBlockApi = import("./apis").GetBlockApi;
        type GetLastBlockApi = import("./apis").GetLastBlockApi;
        type GetTransactionTypeApi = import("./apis").GetTransactionTypeApi;
        type GetTransactionsApi = import("./apis").GetTransactionsApi;
        type GetBfchainVersionApi = import("./apis").GetBfchainVersionApi;
        type GetBlockChainStatusApi = import("./apis").GetBlockChainStatusApi;
        type GenerateSecretApi = import("./apis").GenerateSecretApi;
        type CreateAccountApi = import("./apis").CreateAccountApi;
        type GetAccountPublicKeyApi = import("./apis").GetAccountPublicKeyApi;
        type GetAccountLastTransactionApi = import("./apis").GetAccountLastTransactionApi;
        type GetAccountLastTypeTransactionApi = import("./apis").GetAccountLastTypeTransactionApi;
        type SetKVStorageTempApi = import("./apis").SetKVStorageTempApi;
        type GetKVStorageApi = import("./apis").GetKVStorageApi;
    }
}
