import { Injectable, Inject } from "@bfchain/util";
import { PcSDKExceptionGenerator } from "../helpers/moduleError/expceptionGenerator";
import { ApiBase } from "./apiBase";
import { API } from "./apiConst";
const { ArgumentIllegalException, BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:api", __filename);

export namespace TRS_API {
    /**交易接口基类 */
    @Injectable()
    abstract class TrsApi extends ApiBase {
        constructor(apiInfo: BFChainPcSdk.ApiInfo) {
            super(apiInfo);
        }

        getPrefix() {
            return "/api/transaction";
        }
    }

    /**发送转账事件 */
    @Injectable()
    export class TrTransferAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_TRANSFER_ASSET);
        }
    }

    /**发送设置二次密码事件 */
    @Injectable()
    export class TrSignature extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_SIGNATURE);
        }
    }

    /**发送设置用户名事件 */
    @Injectable()
    export class TrUsername extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_USER_NAME);
        }
    }

    /**发送注册受托人事件 */
    @Injectable()
    export class TrDelegate extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_DELEGATE);
        }
    }

    /**发送接收投票事件 */
    @Injectable()
    export class TrAcceptVote extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_ACCEPT_VOTE);
        }
    }

    /**发送拒绝投票事件 */
    @Injectable()
    export class TrRejectVote extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_REJECT_VOTE);
        }
    }

    /**发送投票事件 */
    @Injectable()
    export class TrVote extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_VOTE);
        }
    }

    /**发送dapp事件 */
    @Injectable()
    export class TrDapp extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_DAPP);
        }
    }

    /**发送dapp购买事件 */
    @Injectable()
    export class TrDappPurchasing extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_DAPP_PURCHASING);
        }
    }

    /**发送存证事件 */
    @Injectable()
    export class TrMark extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_MARK);
        }
    }

    /**发送资产发行事件 */
    @Injectable()
    export class TrIssueAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_ISSUE_ASSET);
        }
    }

    /**发送销毁资产事件 */
    @Injectable()
    export class TrDestroyAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_DESTROYASSET);
        }
    }

    /**发送数字资产交换事件 */
    @Injectable()
    export class TrToExchangeAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_TO_EXCHANGE_ASSET);
        }
    }

    /**发送接收数字资产交换事件 */
    @Injectable()
    export class TrBeExchangeAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_BE_EXCHANGE_ASSET);
        }
    }

    /**发送特殊资产交换事件 */
    @Injectable()
    export class TrToExchangeSpecAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_TO_EXCHANGE_SPEC_ASSET);
        }
    }

    /**发送接收特殊资产交换事件 */
    @Injectable()
    export class TrBeExchangeSpecAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_BE_EXCHANGE_SPEC_ASSET);
        }
    }

    /**发送资产赠与事件（红包事件） */
    @Injectable()
    export class TrGiftAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_GIFT_ASSET);
        }
    }

    /**发送接收资产赠与事件（抢红包事件） */
    @Injectable()
    export class TrGrabAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_GRAB_ASSET);
        }
    }

    /**发送委托数字资产事件 */
    @Injectable()
    export class TrTrustAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_TRUST_ASSET);
        }
    }

    /**发送签收委托数字资产事件 */
    @Injectable()
    export class TrSignForAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_SIGN_FOR_ASSET);
        }
    }

    /**发送资产迁出交易 */
    @Injectable()
    export class TrEmigrateAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_EMIGRATE_ASSET);
        }
    }

    /**发送资产迁入交易 */
    @Injectable()
    export class TrImmigrateAsset extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_IMMIGRATE_ASSET);
        }
    }

    /**发送注册、注销位名系统事件 */
    @Injectable()
    export class TrLocationName extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_LOCATION_NAME);
        }
    }

    /**发送设置位名系统管理员事件 */
    @Injectable()
    export class TrSetLnsManager extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_SET_LNS_MANAGER);
        }
    }

    /**发送设置位名系统解析值事件 */
    @Injectable()
    export class TrSetLnsRecordValue extends TrsApi {
        constructor() {
            super(API.TRANSACTION.TR_SET_LNS_RECORD_VALUE);
        }
    }
}
