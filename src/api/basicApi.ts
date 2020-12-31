import { Injectable } from "@bfchain/util";
import { API } from "./apiConst";
import { ApiBase } from "./apiBase";

export namespace BASIC_API {
    /**基础接口基类 */
    @Injectable()
    export abstract class BasicApi extends ApiBase {
        constructor(apiInfo: SDK.ApiInfo) {
            super(apiInfo);
        }

        getPrefix() {
            return "/api/basic";
        }
    }

    /**获取本地节点当前最新区块 */
    @Injectable()
    export class GetLastBlock extends BasicApi {
        constructor() {
            super(API.BASIC.GET_LAST_BLOCK);
        }
    }

    /**获取指定区块 */
    @Injectable()
    export class GetBlock extends BasicApi {
        constructor() {
            super(API.BASIC.GET_BLOCK);
        }
    }

    /**获取指定事件 */
    @Injectable()
    export class GetTransactions extends BasicApi {
        constructor() {
            super(API.BASIC.GET_TRANSACTIONS);
        }
    }

    /**获取指定账户 */
    @Injectable()
    export class GetAccountInfoAndAssets extends BasicApi {
        constructor() {
            super(API.BASIC.GET_ACCOUNT_INFO_AND_ASSETS);
        }
    }

    /**创建账户 */
    @Injectable()
    export class CreateAccount extends BasicApi {
        constructor() {
            super(API.BASIC.CREATE_ACCOUNT);
        }
    }

    /**获取节点状态 */
    @Injectable()
    export class GetBlockChainStatus extends BasicApi {
        constructor() {
            super(API.BASIC.GET_BLOCKCHAIN_STATUS);
        }
    }
}
