import { Injectable } from "@bfchain/util";
import { PcSDKExceptionGenerator } from "./helpers/moduleError/expceptionGenerator";
const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk", __filename);
import { networkHelper } from "./network/networkHelper";
import { BASIC_API } from "./api";
import { API } from "./api/apiConst";
import { ApiBase } from "./api/apiBase";
import { ApiType } from "./constants";

/**BFChainPC_SDK */
@Injectable()
export class BFChainPC_SDK {
    private __apiMap = new Map<string, ApiBase>();

    constructor() {}

    /**
     * 初始化sdk，配置节点的网络信息
     * @param apiType
     * @param data
     */
    init(apiType: ApiType, data: { ip: string; port: number; timeout?: number }) {
        networkHelper.init(apiType, data);
        for (const key in BASIC_API) {
            const api: ApiBase = new BASIC_API[key]();
            const apiName = api.getName();
            this.__apiMap.set(apiName, api);
        }
    }

    /**
     * 执行接口
     * @param apiName
     * @param request
     */
    async processApi<RequestType, RespType>(apiName: string, request: RequestType) {
        const api = this.__apiMap.get(apiName);
        if (!api) {
            throw new BusinessCheckException(`api: ${apiName} is not exist`);
        }
        return await api.sendRequest<RequestType, RespType>(request);
    }

    //#region 基础接口

    /**获取本地节点当前最新区块 */
    async getLastBlock(): Promise<SDK.ApiResp.BASIC.GetLastBlock> {
        return await this.processApi(API.BASIC.GET_LAST_BLOCK.name, undefined);
    }

    /**获取指定区块 */
    async getBlock(request: SDK.ApiRequest.BASIC.GetBlock): Promise<SDK.ApiResp.BASIC.GetBlock> {
        return await this.processApi(API.BASIC.GET_BLOCK.name, request);
    }

    /**获取指定事件 */
    async getTransactions(request: SDK.ApiRequest.BASIC.GetTransactions): Promise<SDK.ApiResp.BASIC.GetTransactions> {
        return await this.processApi(API.BASIC.GET_TRANSACTIONS.name, request);
    }

    /**获取指定账户 */
    async getAccountInfoAndAssets(request: SDK.ApiRequest.BASIC.GetAccountInfoAndAssets): Promise<SDK.ApiResp.BASIC.GetAccountInfoAndAssets> {
        return await this.processApi(API.BASIC.GET_ACCOUNT_INFO_AND_ASSETS.name, request);
    }

    /**创建账户 */
    async createAccount(request: SDK.ApiRequest.BASIC.CreateAccount): Promise<SDK.ApiResp.BASIC.CreateAccount> {
        return await this.processApi(API.BASIC.CREATE_ACCOUNT.name, request);
    }

    /**获取节点状态 */
    async getBlockChainStatus(): Promise<SDK.ApiResp.BASIC.GetBlockChainStatus> {
        return await this.processApi(API.BASIC.GET_BLOCKCHAIN_STATUS.name, undefined);
    }
    //#endregion

    //#region 交易类接口

    /**发送转账事件 */
    async trTransferAsset(request: SDK.ApiRequest.TRANSACTION.TrTransferAsset): Promise<SDK.ApiResp.TRANSACTION.TrTransferAsset> {
        return await this.processApi(API.TRANSACTION.TR_TRANSFER_ASSET.name, request);
    }

    /**发送设置二次密码事件 */
    async trSignature(request: SDK.ApiRequest.TRANSACTION.TrSignature): Promise<SDK.ApiResp.TRANSACTION.TrSignature> {
        return await this.processApi(API.TRANSACTION.TR_SIGNATURE.name, request);
    }

    /**发送设置用户名事件 */
    async trUsername(request: SDK.ApiRequest.TRANSACTION.TrUsername): Promise<SDK.ApiResp.TRANSACTION.TrUsername> {
        return await this.processApi(API.TRANSACTION.TR_USER_NAME.name, request);
    }

    /**发送注册受托人事件 */
    async trDelegate(request: SDK.ApiRequest.TRANSACTION.TrDelegate): Promise<SDK.ApiResp.TRANSACTION.TrDelegate> {
        return await this.processApi(API.TRANSACTION.TR_DELEGATE.name, request);
    }

    /**发送接收投票事件 */
    async trAcceptVote(request: SDK.ApiRequest.TRANSACTION.TrAcceptVote): Promise<SDK.ApiResp.TRANSACTION.TrAcceptVote> {
        return await this.processApi(API.TRANSACTION.TR_ACCEPT_VOTE.name, request);
    }

    /**发送拒绝投票事件 */
    async trRejectVote(request: SDK.ApiRequest.TRANSACTION.TrRejectVote): Promise<SDK.ApiResp.TRANSACTION.TrRejectVote> {
        return await this.processApi(API.TRANSACTION.TR_REJECT_VOTE.name, request);
    }

    /**发送投票事件 */
    async trVote(request: SDK.ApiRequest.TRANSACTION.TrVote): Promise<SDK.ApiResp.TRANSACTION.TrVote> {
        return await this.processApi(API.TRANSACTION.TR_VOTE.name, request);
    }

    /**发送dapp事件 */
    async trDapp(request: SDK.ApiRequest.TRANSACTION.TrDapp): Promise<SDK.ApiResp.TRANSACTION.TrDapp> {
        return await this.processApi(API.TRANSACTION.TR_DAPP.name, request);
    }

    /**发送dapp购买事件 */
    async trDappPurchasing(request: SDK.ApiRequest.TRANSACTION.TrDappPurchasing): Promise<SDK.ApiResp.TRANSACTION.TrDappPurchasing> {
        return await this.processApi(API.TRANSACTION.TR_DAPP_PURCHASING.name, request);
    }

    /**发送存证事件 */
    async trMark(request: SDK.ApiRequest.TRANSACTION.TrMark): Promise<SDK.ApiResp.TRANSACTION.TrMark> {
        return await this.processApi(API.TRANSACTION.TR_MARK.name, request);
    }

    /**发送资产发行事件 */
    async trIssueAsset(request: SDK.ApiRequest.TRANSACTION.TrIssueAsset): Promise<SDK.ApiResp.TRANSACTION.TrIssueAsset> {
        return await this.processApi(API.TRANSACTION.TR_ISSUE_ASSET.name, request);
    }

    /**发送销毁资产事件 */
    async trDestroyAsset(request: SDK.ApiRequest.TRANSACTION.TrDestroyAsset): Promise<SDK.ApiResp.TRANSACTION.TrDestroyAsset> {
        return await this.processApi(API.TRANSACTION.TR_DESTROYASSET.name, request);
    }

    /**发送数字资产交换事件 */
    async trToExchangeAsset(request: SDK.ApiRequest.TRANSACTION.TrToExchangeAsset): Promise<SDK.ApiResp.TRANSACTION.TrToExchangeAsset> {
        return await this.processApi(API.TRANSACTION.TR_TO_EXCHANGE_ASSET.name, request);
    }

    /**发送接收数字资产交换事件 */
    async trBeExchangeAsset(request: SDK.ApiRequest.TRANSACTION.TrBeExchangeAsset): Promise<SDK.ApiResp.TRANSACTION.TrBeExchangeAsset> {
        return await this.processApi(API.TRANSACTION.TR_BE_EXCHANGE_ASSET.name, request);
    }

    /**发送特殊资产交换事件 */
    async trToExchangeSpecAsset(request: SDK.ApiRequest.TRANSACTION.TrToExchangeSpecAsset): Promise<SDK.ApiResp.TRANSACTION.TrToExchangeSpecAsset> {
        return await this.processApi(API.TRANSACTION.TR_TO_EXCHANGE_SPEC_ASSET.name, request);
    }

    /**发送接收特殊资产交换事件 */
    async trBeExchangeSpecAsset(request: SDK.ApiRequest.TRANSACTION.TrBeExchangeSpecAsset): Promise<SDK.ApiResp.TRANSACTION.TrBeExchangeSpecAsset> {
        return await this.processApi(API.TRANSACTION.TR_BE_EXCHANGE_SPEC_ASSET.name, request);
    }

    /**发送资产赠与事件（红包事件） */
    async trGiftAsset(request: SDK.ApiRequest.TRANSACTION.TrGiftAsset): Promise<SDK.ApiResp.TRANSACTION.TrGiftAsset> {
        return await this.processApi(API.TRANSACTION.TR_GIFT_ASSET.name, request);
    }

    /**发送接收资产赠与事件（抢红包事件） */
    async trGrabAsset(request: SDK.ApiRequest.TRANSACTION.TrGrabAsset): Promise<SDK.ApiResp.TRANSACTION.TrGrabAsset> {
        return await this.processApi(API.TRANSACTION.TR_GRAB_ASSET.name, request);
    }

    /**发送委托数字资产事件 */
    async trTrustAsset(request: SDK.ApiRequest.TRANSACTION.TrTrustAsset): Promise<SDK.ApiResp.TRANSACTION.TrTrustAsset> {
        return await this.processApi(API.TRANSACTION.TR_TRUST_ASSET.name, request);
    }

    /**发送签收委托数字资产事件 */
    async trSignForAsset(request: SDK.ApiRequest.TRANSACTION.TrSignForAsset): Promise<SDK.ApiResp.TRANSACTION.TrSignForAsset> {
        return await this.processApi(API.TRANSACTION.TR_SIGN_FOR_ASSET.name, request);
    }

    /**发送资产迁出交易 */
    async trEmigrateAsset(request: SDK.ApiRequest.TRANSACTION.TrEmigrateAsset): Promise<SDK.ApiResp.TRANSACTION.TrEmigrateAsset> {
        return await this.processApi(API.TRANSACTION.TR_EMIGRATE_ASSET.name, request);
    }

    /**发送资产迁入交易 */
    async trImmigrateAsset(request: SDK.ApiRequest.TRANSACTION.TrImmigrateAsset): Promise<SDK.ApiResp.TRANSACTION.TrImmigrateAsset> {
        return await this.processApi(API.TRANSACTION.TR_IMMIGRATE_ASSET.name, request);
    }

    /**发送注册、注销位名系统事件 */
    async trLocationName(request: SDK.ApiRequest.TRANSACTION.TrLocationName): Promise<SDK.ApiResp.TRANSACTION.TrLocationName> {
        return await this.processApi(API.TRANSACTION.TR_LOCATION_NAME.name, request);
    }

    /**发送设置位名系统管理员事件 */
    async trSetLnsManager(request: SDK.ApiRequest.TRANSACTION.TrSetLnsManager): Promise<SDK.ApiResp.TRANSACTION.TrSetLnsManager> {
        return await this.processApi(API.TRANSACTION.TR_SET_LNS_MANAGER.name, request);
    }

    /**发送设置位名系统解析值事件 */
    async trSetLnsRecordValue(request: SDK.ApiRequest.TRANSACTION.TrSetLnsRecordValue): Promise<SDK.ApiResp.TRANSACTION.TrSetLnsRecordValue> {
        return await this.processApi(API.TRANSACTION.TR_SET_LNS_RECORD_VALUE.name, request);
    }

    //#endregion

    //#region 矿机管理接口

    /**安全关闭节点 */
    async safetyClose(request: SDK.ApiRequest.SYSTEM.SafetyClose): Promise<SDK.ApiResp.SYSTEM.SafetyClose> {
        return await this.processApi(API.SYSTEM.SAFETY_CLOSE.name, request);
    }

    /**设置节点密码 */
    async setSystemKey(request: SDK.ApiRequest.SYSTEM.SetSystemKey): Promise<SDK.ApiResp.SYSTEM.SetSystemKey> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_KEY.name, request);
    }

    /**验证节点密码 */
    async verifySystemKey(request: SDK.ApiRequest.SYSTEM.VerifySystemKey): Promise<SDK.ApiResp.SYSTEM.VerifySystemKey> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_KEY.name, request);
    }

    /**增加节点管理员 */
    async addSystemAdmin(request: SDK.ApiRequest.SYSTEM.AddSystemAdmin): Promise<SDK.ApiResp.SYSTEM.AddSystemAdmin> {
        return await this.processApi(API.SYSTEM.ADD_SYSTEM_ADMIN.name, request);
    }

    /**获得节点管理员 */
    async getSystemAdmin(request: SDK.ApiRequest.SYSTEM.GetSystemAdmin): Promise<SDK.ApiResp.SYSTEM.GetSystemAdmin> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_ADMIN.name, request);
    }

    /**验证节点管理员 */
    async verifySystemAdmin(request: SDK.ApiRequest.SYSTEM.VerifySystemAdmin): Promise<SDK.ApiResp.SYSTEM.VerifySystemAdmin> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_ADMIN.name, request);
    }

    /**删除节点管理员 */
    async delSystemAdmin(request: SDK.ApiRequest.SYSTEM.DelSystemAdmin): Promise<SDK.ApiResp.SYSTEM.DelSystemAdmin> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_ADMIN.name, request);
    }

    /**重置节点管理员 */
    async resetSystemAdmin(request: SDK.ApiRequest.SYSTEM.ResetSystemAdmin): Promise<SDK.ApiResp.SYSTEM.ResetSystemAdmin> {
        return await this.processApi(API.SYSTEM.RESET_SYSTEM_ADMIN.name, request);
    }

    /**绑定节点账户 */
    async bindingAccount(request: SDK.ApiRequest.SYSTEM.BindingAccount): Promise<SDK.ApiResp.SYSTEM.BindingAccount> {
        return await this.processApi(API.SYSTEM.BINDING_ACCOUNT.name, request);
    }

    /**获得节点受托人 */
    async getSystemDelegate(request: SDK.ApiRequest.SYSTEM.GetSystemDelegate): Promise<SDK.ApiResp.SYSTEM.GetSystemDelegate> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_DELEGATE.name, request);
    }

    /**节点信息查询 */
    async miningMachineInfo(request: SDK.ApiRequest.SYSTEM.MiningMachineInfo): Promise<SDK.ApiResp.SYSTEM.MiningMachineInfo> {
        return await this.processApi(API.SYSTEM.MINING_MACHINE_INFO.name, request);
    }

    /**设置节点配置信息 */
    async setSystemConfig(request: SDK.ApiRequest.SYSTEM.SetSystemConfig): Promise<SDK.ApiResp.SYSTEM.SetSystemConfig> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_KEY.name, request);
    }

    /**获得节点配置信息 */
    async getSystemConfigInfoDetail(request: SDK.ApiRequest.SYSTEM.GetSystemConfigInfoDetail): Promise<SDK.ApiResp.SYSTEM.GetSystemConfigInfoDetail> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_CONFIG_INFO_DETAIL.name, request);
    }
    /**获得节点状态（实时信息） */
    async getRuntimeState(request: SDK.ApiRequest.SYSTEM.GetRuntimeState): Promise<SDK.ApiResp.SYSTEM.GetRuntimeState> {
        return await this.processApi(API.SYSTEM.GET_RUNTIME_STATE.name, request);
    }

    /**获得节点访问统计信息 */
    async getSystemMonitor(request: SDK.ApiRequest.SYSTEM.GetSystemMonitor): Promise<SDK.ApiResp.SYSTEM.GetSystemMonitor> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_MONITOR.name, request);
    }

    /**获得节点运行日志类型 */
    async getSystemLoggerType(request: SDK.ApiRequest.SYSTEM.GetSystemLoggerType): Promise<SDK.ApiResp.SYSTEM.GetSystemLoggerType> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_TYPE.name, request);
    }

    /**获得节点运行日志列表 */
    async getSystemLoggerList(request: SDK.ApiRequest.SYSTEM.GetSystemLoggerList): Promise<SDK.ApiResp.SYSTEM.GetSystemLoggerList> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_LIST.name, request);
    }

    /**获得节点运行日志内容 */
    async getSystemLoggerDetail(request: SDK.ApiRequest.SYSTEM.GetSystemLoggerDetail): Promise<SDK.ApiResp.SYSTEM.GetSystemLoggerDetail> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_LOGGER_DETAIL.name, request);
    }

    /**删除矿机运行日志 */
    async delSystemLogger(request: SDK.ApiRequest.SYSTEM.DelSystemLogger): Promise<SDK.ApiResp.SYSTEM.DelSystemLogger> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_LOGGER.name, request);
    }

    /**获得节点邮箱地址 */
    async getEmailAddress(request: SDK.ApiRequest.SYSTEM.GetEmailAddress): Promise<SDK.ApiResp.SYSTEM.GetEmailAddress> {
        return await this.processApi(API.SYSTEM.GET_EMAIL_ADDRESS.name, request);
    }

    /**设置节点邮箱地址 */
    async setEmailAddress(request: SDK.ApiRequest.SYSTEM.SetEmailAddress): Promise<SDK.ApiResp.SYSTEM.SetEmailAddress> {
        return await this.processApi(API.SYSTEM.SET_EMAIL_ADDRESS.name, request);
    }

    /**通过节点私钥验证节点受托人 */
    async verifySystemSecret(request: SDK.ApiRequest.SYSTEM.VerifySystemSecret): Promise<SDK.ApiResp.SYSTEM.VerifySystemSecret> {
        return await this.processApi(API.SYSTEM.VERIFY_SYSTEM_SECRET.name, request);
    }

    /**设置节点访问白名单 */
    async setSystemWhiteList(request: SDK.ApiRequest.SYSTEM.SetSystemWhiteList): Promise<SDK.ApiResp.SYSTEM.SetSystemWhiteList> {
        return await this.processApi(API.SYSTEM.SET_SYSTEM_WHITELIST.name, request);
    }

    /**获得节点访问白名单 */
    async getSystemWhiteList(request: SDK.ApiRequest.SYSTEM.GetSystemWhiteList): Promise<SDK.ApiResp.SYSTEM.GetSystemWhiteList> {
        return await this.processApi(API.SYSTEM.GET_SYSTEM_WHITELIST.name, request);
    }

    /**删除节点访问白名单 */
    async delSystemWhiteList(request: SDK.ApiRequest.SYSTEM.DelSystemWhiteList): Promise<SDK.ApiResp.SYSTEM.DelSystemWhiteList> {
        return await this.processApi(API.SYSTEM.DEL_SYSTEM_WHITELIST.name, request);
    }

    /**获得节点进程的网络相关信息 */
    async getProcessNetwork(request: SDK.ApiRequest.SYSTEM.GetProcessNetwork): Promise<SDK.ApiResp.SYSTEM.GetProcessNetwork> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_NETWORK.name, request);
    }

    /**获得节点进程CPU信息 */
    async getProcessCPU(request: SDK.ApiRequest.SYSTEM.GetProcessCPU): Promise<SDK.ApiResp.SYSTEM.GetProcessCPU> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_CPU.name, request);
    }

    /**获得节点进程内存信息 */
    async getProcessMemory(request: SDK.ApiRequest.SYSTEM.GetProcessMemory): Promise<SDK.ApiResp.SYSTEM.GetProcessMemory> {
        return await this.processApi(API.SYSTEM.GET_PROCESS_MEMORY.name, request);
    }

    /**定时发送节点状态 */
    async systemStatus(request: SDK.ApiRequest.SYSTEM.SystemStatus): Promise<SDK.ApiResp.SYSTEM.SystemStatus> {
        return await this.processApi(API.SYSTEM.SYSTEM_STATUS.name, request);
    }

    /**定时发送节点CPU，内存，网络信息 */
    async systemProcess(request: SDK.ApiRequest.SYSTEM.SystemProcess): Promise<SDK.ApiResp.SYSTEM.SystemProcess> {
        return await this.processApi(API.SYSTEM.SYSTEM_PROCESS.name, request);
    }

    //#endregion
}
