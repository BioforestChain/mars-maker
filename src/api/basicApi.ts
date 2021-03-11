import { API } from "./apiConst";
import { ApiBase } from "./apiBase";

export namespace BASIC_API {
    /**基础接口基类 */
    abstract class BasicApi extends ApiBase {
        constructor(apiInfo: BFChainPcSdk.ApiInfo) {
            super(apiInfo);
        }

        getPrefix() {
            return "/api/basic";
        }
    }

    /**获得Bfchain版本号 */
    export class GetBfchainVersion extends BasicApi {
        constructor() {
            super(API.BASIC.GET_BFCHAIN_VERSION);
        }
    }

    /**获取本地节点当前最新区块 */
    export class GetLastBlock extends BasicApi {
        constructor() {
            super(API.BASIC.GET_LAST_BLOCK);
        }
    }

    /**获取指定区块 */
    export class GetBlock extends BasicApi {
        constructor() {
            super(API.BASIC.GET_BLOCK);
        }
    }

    /**获取指定事件 */
    export class GetTransactions extends BasicApi {
        constructor() {
            super(API.BASIC.GET_TRANSACTIONS);
        }
    }

    /**获取账户公钥 */
    export class GetAccountPublicKey extends BasicApi {
        constructor() {
            super(API.BASIC.GET_ACCOUNT_PUBLIC_KEY);
        }
    }

    /**创建账户 */
    export class CreateAccount extends BasicApi {
        constructor() {
            super(API.BASIC.CREATE_ACCOUNT);
        }
    }

    /**获取节点状态 */
    export class GetBlockChainStatus extends BasicApi {
        constructor() {
            super(API.BASIC.GET_BLOCKCHAIN_STATUS);
        }
    }
}
