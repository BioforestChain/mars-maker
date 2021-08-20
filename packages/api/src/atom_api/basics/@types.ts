declare namespace BFChainPcSdk {
    namespace Basic {
        type TRANSACTION_TYPES_BASE = import("@bfchain/core").TRANSACTION_TYPES_BASE;

        // #region request
        interface BasicApiRequestParams {}

        /**获取指定区块 */
        interface GetBlockParams extends BasicApiRequestParams {
            /**区块签名 */
            signature?: string;
            /**区块高度 */
            height?: number;
            /**查看第几页（一页20条记录） */
            page?: number;
        }
        /**获取事件类型 */
        interface GetTransactionTypeParams extends BasicApiRequestParams {
            /**事件基础类型 */
            baseType: TRANSACTION_TYPES_BASE;
        }
        /**获取指定事件 */
        interface GetTransactionsParams extends BasicApiRequestParams {
            /**事件id */
            signature?: string;
            /**事件所属区块高度 */
            height?: number;
            /**查询的区块的最小高度 */
            minHeight?: number;
            /**查询的区块的最大高度 */
            maxHeight?: number;
            /**事件发起方 */
            senderId?: string;
            /**事件接收方 */
            recipientId?: string;
            /**事件类型，如果不传入则不筛选事件类型，事件类型请参考<事件类型> */
            type?: string[];
            /**查看第几页（一页20条记录） */
            page?: number;
        }
        /**生成账户私钥 */
        interface GenerateSecretParams extends BasicApiRequestParams {
            /**语言 */
            lang: string;
        }
        /**创建账户 */
        interface CreateAccountParams extends BasicApiRequestParams {
            /**账户密钥 */
            secret: string;
        }
        /**获取账户公钥 */
        interface GetAccountPublicKeyParams extends BasicApiRequestParams {
            /**账户地址 */
            address: string;
        }
        /**获取账户的最后一笔交易 */
        interface GetAccountLastTransactionParams extends BasicApiRequestParams {
            /**账户地址 */
            address: string;
            /**交易事件类型，通过GetTransactionType接口获得 */
            assetType: string;
        }
        /**获取账户指定类型的最后一笔交易 */
        interface GetAccountLastTypeTransactionParams extends BasicApiRequestParams {
            /**账户地址 */
            address: string;
            /**交易事件类型，通过GetTransactionType接口获得 */
            transactionType: string;
        }
        // #endregion

        // #region response
        interface BasicApiRequestResult {}

        /**获取指定区块 */
        interface GetBlockResult extends BasicApiRequestResult {
            blocks: BFChainCore.BlockJSON[];
            count: number;
            cmdLimitPerQuery: number;
        }
        /**获取本地节点当前最新区块 */
        interface GetLastBlockResult extends BasicApiRequestResult {
            result: BFChainCore.LastBlockInfo<any>;
        }
        /**获取事件类型 */
        interface GetTransactionTypeResult extends BasicApiRequestResult {
            /**事件类型全称 */
            type: string;
        }
        /**获取指定事件 */
        interface GetTransactionsResult extends BasicApiRequestResult {
            trs: BFChainCore.TransactionInBlockJSON[];
            count: number;
            cmdLimitPerQuery: number;
        }
        /**生成账户私钥 */
        interface GenerateSecretResult extends BasicApiRequestResult {
            /**账户私钥 */
            secret: string;
        }
        /**创建账户 */
        interface CreateAccountResult extends BasicApiRequestResult {
            /**账户地址 */
            address: string;
            /**账户公钥 */
            publicKey: string;
            /**账户私钥 */
            secretKey: string;
        }
        /**获取账户公钥 */
        interface GetAccountPublicKeyResult extends BasicApiRequestResult {
            /**账户公钥 */
            publicKey?: string;
        }
        /**获得Bfchain版本号 */
        interface GetBfchainVersionResult extends BasicApiRequestResult {
            /**当前节点的版本号 */
            version: string;
        }
        /**获取节点状态 */
        interface GetBlockChainStatusResult extends BasicApiRequestResult {
            status: BFChainCore.BlockchainStatusJSON["status"];
            peers: number;
            isReady: boolean;
            serverTimestamp: number;
        }
        /**获取账户的最后一笔交易 */
        interface GetAccountLastTransactionResult extends BasicApiRequestResult {
            transactionInBlock?: BFChainCore.TransactionInBlockJSON;
            assetIndex?: { [assetType: string]: number };
            block?: BFChainCore.BlockJSON;
        }
        /**获取账户指定类型的最后一笔交易 */
        interface GetAccountLastTypeTransactionResult extends BasicApiRequestResult {
            transactionInBlock?: BFChainCore.TransactionInBlockJSON;
        }
        // #endregion

        interface BasicApiSuccessReturn<T extends BasicApiRequestResult> extends ApiSuccessReturn {
            result: T;
        }
        interface BasicApiFailureReturn extends ApiFailureReturn {}

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
    }
}
