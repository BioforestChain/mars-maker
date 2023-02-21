import { networkHelper } from "./network/networkHelper";
import { API } from "./api/apiConst";
import { ApiBase } from "./api/apiBase";
import { BASIC_API } from "./api";
import { TRS_API } from "./api/transactionApi";
import { SYSTEM_API } from "./api/systemApi";
import { EventEmitter } from "events";

/**BFChainPC_SDK */
export class BFChainPC_SDK extends EventEmitter {
    private __apiMap = new Map<string, ApiBase>();

    constructor() {
        super();
    }

    /**
     * 初始化sdk，配置节点的网络信息
     * @param options
     */
    async init(options: BFMetaPcSdk.SdkNetOptions) {
        for (const key in BASIC_API) {
            const api: ApiBase = new BASIC_API[key]();
            const apiName = api.getName();
            this.__apiMap.set(apiName, api);
        }
        for (const key in TRS_API) {
            const api: ApiBase = new TRS_API[key]();
            const apiName = api.getName();
            this.__apiMap.set(apiName, api);
        }
        for (const key in SYSTEM_API) {
            const api: ApiBase = new SYSTEM_API[key]();
            const apiName = api.getName();
            this.__apiMap.set(apiName, api);
        }
        await networkHelper.init(this, options);
    }

    /**
     * 执行接口
     * @param apiName
     * @param request
     */
    async processApi<RespType extends BFMetaPcSdk.SDKReturn>(apiName: string, request?: BFMetaPcSdk.PcApiRequest): Promise<RespType> {
        const api = this.__apiMap.get(apiName);
        if (!api) {
            throw new Error(`api: ${apiName} is not exist`);
        }
        const result: any = await api.execute(request);
        return result;
    }

    //#region 基础接口

    /**获得Bfchain版本号 */
    async getBfchainVersion(): Promise<BFMetaPcSdk.ApiResp.BASIC.GetBfchainVersion> {
        return await this.processApi(API.BASIC.GET_BFCHAIN_VERSION.name);
    }

    /**获取交易类型 */
    async getTransactionType(request: BFMetaPcSdk.ApiRequest.BASIC.GetTransactionType): Promise<BFMetaPcSdk.ApiResp.BASIC.GetTransactionType> {
        return await this.processApi(API.BASIC.GET_TRANSACTION_TYPE.name, request);
    }

    /**获取本地节点当前最新区块 */
    async getLastBlock(): Promise<BFMetaPcSdk.ApiResp.BASIC.GetLastBlock> {
        return await this.processApi(API.BASIC.GET_LAST_BLOCK.name);
    }

    /**获取指定区块 */
    async getBlock(request: BFMetaPcSdk.ApiRequest.BASIC.GetBlock): Promise<BFMetaPcSdk.ApiResp.BASIC.GetBlock> {
        return await this.processApi(API.BASIC.GET_BLOCK.name, request);
    }

    /**获取指定事件 */
    async getTransactions(request: BFMetaPcSdk.ApiRequest.BASIC.GetTransactions): Promise<BFMetaPcSdk.ApiResp.BASIC.GetTransactions> {
        return await this.processApi(API.BASIC.GET_TRANSACTIONS.name, request);
    }

    /**生成账户私钥 */
    async generateSecret(request: BFMetaPcSdk.ApiRequest.BASIC.GenerateSecret): Promise<BFMetaPcSdk.ApiResp.BASIC.GenerateSecret> {
        return await this.processApi(API.BASIC.GENERATE_SECRET.name, request);
    }

    /**获取账户公钥 */
    async getAccountPublicKey(request: BFMetaPcSdk.ApiRequest.BASIC.GetAccountPublicKey): Promise<BFMetaPcSdk.ApiResp.BASIC.GetAccountPublicKey> {
        return await this.processApi(API.BASIC.GET_ACCOUNT_PUBLIC_KEY.name, request);
    }

    /**获取账户资产 */
    async getAccountAsset(request: BFMetaPcSdk.ApiRequest.BASIC.GetAccountAsset): Promise<BFMetaPcSdk.ApiResp.BASIC.GetAccountAsset> {
        return await this.processApi(API.BASIC.GET_ACCOUNT_ASSET.name, request);
    }

    /**创建账户 */
    async createAccount(request: BFMetaPcSdk.ApiRequest.BASIC.CreateAccount): Promise<BFMetaPcSdk.ApiResp.BASIC.CreateAccount> {
        return await this.processApi(API.BASIC.CREATE_ACCOUNT.name, request);
    }

    /**获取节点状态 */
    async getBlockChainStatus(): Promise<BFMetaPcSdk.ApiResp.BASIC.GetBlockChainStatus> {
        return await this.processApi(API.BASIC.GET_BLOCKCHAIN_STATUS.name);
    }
    //#endregion

    //#region 交易类接口

    /**发送转账事件 */
    async trTransferAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrTransferAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrTransferAsset> {
        return await this.processApi(API.TRANSACTION.TR_TRANSFER_ASSET.name, request);
    }

    /**发送设置二次密码事件 */
    async trSignature(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrSignature): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrSignature> {
        return await this.processApi(API.TRANSACTION.TR_SIGNATURE.name, request);
    }

    /**发送设置用户名事件 */
    async trUsername(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrUsername): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrUsername> {
        return await this.processApi(API.TRANSACTION.TR_USER_NAME.name, request);
    }

    /**发送注册受托人事件 */
    async trDelegate(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrDelegate): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrDelegate> {
        return await this.processApi(API.TRANSACTION.TR_DELEGATE.name, request);
    }

    /**发送接收投票事件 */
    async trAcceptVote(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrAcceptVote): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrAcceptVote> {
        return await this.processApi(API.TRANSACTION.TR_ACCEPT_VOTE.name, request);
    }

    /**发送拒绝投票事件 */
    async trRejectVote(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrRejectVote): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrRejectVote> {
        return await this.processApi(API.TRANSACTION.TR_REJECT_VOTE.name, request);
    }

    /**发送投票事件 */
    async trVote(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrVote): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrVote> {
        return await this.processApi(API.TRANSACTION.TR_VOTE.name, request);
    }

    /**发送dapp事件 */
    async trDapp(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrDapp): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrDapp> {
        return await this.processApi(API.TRANSACTION.TR_DAPP.name, request);
    }

    /**发送dapp购买事件 */
    async trDappPurchasing(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrDappPurchasing): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrDappPurchasing> {
        return await this.processApi(API.TRANSACTION.TR_DAPP_PURCHASING.name, request);
    }

    /**发送存证事件 */
    async trMark(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrMark): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrMark> {
        return await this.processApi(API.TRANSACTION.TR_MARK.name, request);
    }

    /**发送资产发行事件 */
    async trIssueAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrIssueAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrIssueAsset> {
        return await this.processApi(API.TRANSACTION.TR_ISSUE_ASSET.name, request);
    }

    /**发送销毁资产事件 */
    async trDestroyAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrDestroyAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrDestroyAsset> {
        return await this.processApi(API.TRANSACTION.TR_DESTROYASSET.name, request);
    }

    /**发送数字资产交换事件 */
    async trToExchangeAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrToExchangeAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrToExchangeAsset> {
        return await this.processApi(API.TRANSACTION.TR_TO_EXCHANGE_ASSET.name, request);
    }

    /**发送接收数字资产交换事件 */
    async trBeExchangeAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrBeExchangeAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrBeExchangeAsset> {
        return await this.processApi(API.TRANSACTION.TR_BE_EXCHANGE_ASSET.name, request);
    }

    /**发送特殊资产交换事件 */
    async trToExchangeSpecAsset(
        request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrToExchangeSpecAsset
    ): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrToExchangeSpecAsset> {
        return await this.processApi(API.TRANSACTION.TR_TO_EXCHANGE_SPEC_ASSET.name, request);
    }

    /**发送接收特殊资产交换事件 */
    async trBeExchangeSpecAsset(
        request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrBeExchangeSpecAsset
    ): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrBeExchangeSpecAsset> {
        return await this.processApi(API.TRANSACTION.TR_BE_EXCHANGE_SPEC_ASSET.name, request);
    }

    /**发送资产赠与事件（红包事件） */
    async trGiftAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrGiftAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrGiftAsset> {
        return await this.processApi(API.TRANSACTION.TR_GIFT_ASSET.name, request);
    }

    /**发送接收资产赠与事件（抢红包事件） */
    async trGrabAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrGrabAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrGrabAsset> {
        return await this.processApi(API.TRANSACTION.TR_GRAB_ASSET.name, request);
    }

    /**发送委托数字资产事件 */
    async trTrustAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrTrustAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrTrustAsset> {
        return await this.processApi(API.TRANSACTION.TR_TRUST_ASSET.name, request);
    }

    /**发送签收委托数字资产事件 */
    async trSignForAsset(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrSignForAsset): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrSignForAsset> {
        return await this.processApi(API.TRANSACTION.TR_SIGN_FOR_ASSET.name, request);
    }

    /**发送注册、注销位名系统事件 */
    async trLocationName(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrLocationName): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrLocationName> {
        return await this.processApi(API.TRANSACTION.TR_LOCATION_NAME.name, request);
    }

    /**发送设置位名系统管理员事件 */
    async trSetLnsManager(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrSetLnsManager): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrSetLnsManager> {
        return await this.processApi(API.TRANSACTION.TR_SET_LNS_MANAGER.name, request);
    }

    /**发送设置位名系统解析值事件 */
    async trSetLnsRecordValue(request: BFMetaPcSdk.ApiRequest.TRANSACTION.TrSetLnsRecordValue): Promise<BFMetaPcSdk.ApiResp.TRANSACTION.TrSetLnsRecordValue> {
        return await this.processApi(API.TRANSACTION.TR_SET_LNS_RECORD_VALUE.name, request);
    }

    //#endregion

    //#region 矿机管理接口

    /**安全关闭节点 */
    async safetyClose(request: BFMetaPcSdk.ApiRequest.SYSTEM.SafetyClose): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SafetyClose> {
        return await this.processApi(API.SYSTEM.SAFETY_CLOSE.name, request);
    }

    /**设置节点密码 */
    async setSystemKey(request: BFMetaPcSdk.ApiRequest.SYSTEM.SetSystemKey): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SetSystemKey> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_KEY.name, request);
    }

    /**验证节点密码 */
    async verifySystemKey(request: BFMetaPcSdk.ApiRequest.SYSTEM.VerifySystemKey): Promise<BFMetaPcSdk.ApiResp.SYSTEM.VerifySystemKey> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_KEY.name, request);
    }

    /**增加节点管理员 */
    async addSystemAdmin(request: BFMetaPcSdk.ApiRequest.SYSTEM.AddSystemAdmin): Promise<BFMetaPcSdk.ApiResp.SYSTEM.AddSystemAdmin> {
        return await this.processApi(API.SYSTEM.ADD_SYSTEM_ADMIN.name, request);
    }

    /**获得节点管理员 */
    async getSystemAdmin(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemAdmin): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemAdmin> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_ADMIN.name, request);
    }

    /**验证节点管理员 */
    async verifySystemAdmin(request: BFMetaPcSdk.ApiRequest.SYSTEM.VerifySystemAdmin): Promise<BFMetaPcSdk.ApiResp.SYSTEM.VerifySystemAdmin> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_ADMIN.name, request);
    }

    /**删除节点管理员 */
    async delSystemAdmin(request: BFMetaPcSdk.ApiRequest.SYSTEM.DelSystemAdmin): Promise<BFMetaPcSdk.ApiResp.SYSTEM.DelSystemAdmin> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_ADMIN.name, request);
    }

    /**重置节点管理员 */
    async resetSystemAdmin(request: BFMetaPcSdk.ApiRequest.SYSTEM.ResetSystemAdmin): Promise<BFMetaPcSdk.ApiResp.SYSTEM.ResetSystemAdmin> {
        return await this.processApi(API.SYSTEM.RESET_SYSTEM_ADMIN.name, request);
    }

    /**绑定节点账户 */
    async bindingAccount(request: BFMetaPcSdk.ApiRequest.SYSTEM.BindingAccount): Promise<BFMetaPcSdk.ApiResp.SYSTEM.BindingAccount> {
        return await this.processApi(API.SYSTEM.BINDING_ACCOUNT.name, request);
    }

    /**获得节点受托人 */
    async getSystemDelegate(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemDelegate): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemDelegate> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_DELEGATE.name, request);
    }

    /**节点信息查询 */
    async miningMachineInfo(request: BFMetaPcSdk.ApiRequest.SYSTEM.MiningMachineInfo): Promise<BFMetaPcSdk.ApiResp.SYSTEM.MiningMachineInfo> {
        return await this.processApi(API.SYSTEM.MINING_MACHINE_INFO.name, request);
    }

    /**设置节点配置信息 */
    async setSystemConfig(request: BFMetaPcSdk.ApiRequest.SYSTEM.SetSystemConfig): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SetSystemConfig> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_CONFIG.name, request);
    }

    /**获得节点配置信息 */
    async getSystemConfigInfoDetail(
        request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemConfigInfoDetail
    ): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemConfigInfoDetail> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_CONFIG_INFO_DETAIL.name, request);
    }

    /**获得节点状态（实时信息） */
    async getRuntimeState(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetRuntimeState): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetRuntimeState> {
        return await this.processApi(API.SYSTEM.GET_RUNTIME_STATE.name, request);
    }

    /**获得节点访问统计信息 */
    async getSystemMonitor(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemMonitor): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemMonitor> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_MONITOR.name, request);
    }

    /**获得节点运行日志类型 */
    async getSystemLoggerType(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemLoggerType): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemLoggerType> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_TYPE.name, request);
    }

    /**获得节点运行日志列表 */
    async getSystemLoggerList(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemLoggerList): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemLoggerList> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_LIST.name, request);
    }

    /**获得节点运行日志内容 */
    async getSystemLoggerDetail(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemLoggerDetail): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemLoggerDetail> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_DETAIL.name, request);
    }

    /**删除矿机运行日志 */
    async delSystemLogger(request: BFMetaPcSdk.ApiRequest.SYSTEM.DelSystemLogger): Promise<BFMetaPcSdk.ApiResp.SYSTEM.DelSystemLogger> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_LOGGER.name, request);
    }

    /**获得节点邮箱地址 */
    async getEmailAddress(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetEmailAddress): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetEmailAddress> {
        return await this.processApi(API.SYSTEM.GET_EMAIL_ADDRESS.name, request);
    }

    /**设置节点邮箱地址 */
    async setEmailAddress(request: BFMetaPcSdk.ApiRequest.SYSTEM.SetEmailAddress): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SetEmailAddress> {
        return await this.processApi(API.SYSTEM.SET_EMAIL_ADDRESS.name, request);
    }

    /**通过节点私钥验证节点受托人 */
    async verifySystemSecret(request: BFMetaPcSdk.ApiRequest.SYSTEM.VerifySystemSecret): Promise<BFMetaPcSdk.ApiResp.SYSTEM.VerifySystemSecret> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_SECRET.name, request);
    }

    /**设置节点访问白名单 */
    async setSystemWhiteList(request: BFMetaPcSdk.ApiRequest.SYSTEM.SetSystemWhiteList): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SetSystemWhiteList> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_WHITELIST.name, request);
    }

    /**获得节点访问白名单 */
    async getSystemWhiteList(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetSystemWhiteList): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetSystemWhiteList> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_WHITELIST.name, request);
    }

    /**删除节点访问白名单 */
    async delSystemWhiteList(request: BFMetaPcSdk.ApiRequest.SYSTEM.DelSystemWhiteList): Promise<BFMetaPcSdk.ApiResp.SYSTEM.DelSystemWhiteList> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_WHITELIST.name, request);
    }

    /**获得节点进程的网络相关信息 */
    async getProcessNetwork(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetProcessNetwork): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetProcessNetwork> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_NETWORK.name, request);
    }

    /**获得节点进程CPU信息 */
    async getProcessCPU(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetProcessCPU): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetProcessCPU> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_CPU.name, request);
    }

    /**获得节点进程内存信息 */
    async getProcessMemory(request: BFMetaPcSdk.ApiRequest.SYSTEM.GetProcessMemory): Promise<BFMetaPcSdk.ApiResp.SYSTEM.GetProcessMemory> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_MEMORY.name, request);
    }

    /**定时发送节点状态 */
    async systemStatus(request: BFMetaPcSdk.ApiRequest.SYSTEM.SystemStatus): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SystemStatus> {
        return await this.processApi(API.SYSTEM.SYSTEM_STATUS.name, request);
    }

    /**定时发送节点CPU，内存，网络信息 */
    async systemProcess(request: BFMetaPcSdk.ApiRequest.SYSTEM.SystemProcess): Promise<BFMetaPcSdk.ApiResp.SYSTEM.SystemProcess> {
        return await this.processApi(API.SYSTEM.SYSTEM_PROCESS.name, request);
    }

    //#endregion
}
