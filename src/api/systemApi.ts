// import { Injectable } from "@bfchain/util";
// import { PcSDKExceptionGenerator } from "../helpers/moduleError/expceptionGenerator";
// import { ApiBase } from "./apiBase";
// const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:api", __filename);

// export namespace SYSTEM_API {
//     /**节点管理接口基类 */
//     @Injectable()
//     abstract class SystemApi extends ApiBase {
//         constructor(apiInfo: SDK.ApiInfo) {
//             super(apiInfo);
//         }

//         getPrefix() {
//             return "/api/system";
//         }

//         getCmdCheckParam(): BFChainPC.Api.CmdApiCheckParam {
//             return { verifyType: "string", verifyKey: "string" };
//         }

//         generateRequest(request: BFChainPC.Api.CmdApiRequest): BFChainPC.Api.ApiRequest {
//             return this.generateCommonParam(request);
//         }

//         generateCommonParam(request: BFChainPC.Api.CmdApiRequest): BFChainPC.ApiRequest.SYSTEM.AdminCommonParam {
//             return { verifyType: request.verifyType, verifyKey: this.cryptoSystemkey(request.verifyType, request.verifyKey) };
//         }

//         /**
//          * 加密矿机相关信息，比如密码或者矿机地址
//          */
//         protected cryptoSystemkey(verifyType: string, verifyKey: string) {
//             if (verifyType === SystemVerifyType.SYSTEM_OWNER) {
//                 // 得到密码的签名
//                 const cryptoKey = crypto
//                     .createHash("sha256")
//                     .update(verifyKey, "utf8")
//                     .digest("hex");

//                 // 返回加密后的矿机密码
//                 return cryptoKey;
//             } else if (verifyType === SystemVerifyType.SYSTEM_ADMIN) {
//                 const cryptoAdminAddress = crypto
//                     .createHash("sha256")
//                     .update(verifyKey, "utf8")
//                     .digest("hex");
//                 // 返回加密后的矿机地址
//                 return cryptoAdminAddress;
//             }

//             return verifyKey;
//         }

//         /**
//          * 私钥加密
//          */
//         protected encryptSecret(delegateSecret: string, systemSecret: string, version: number) {
//             // 加密后的矿机密码
//             const encryptSystemSecret = crypto
//                 .createHash("sha256")
//                 .update(systemSecret, "utf8")
//                 .digest("hex");
//             return {
//                 encryptSystemSecret,
//                 encryptDelegateSecret: cryptoUtil.aes256Encrypt(delegateSecret, systemSecret, version),
//             };
//         }
//     }

//     /**节点管理admin接口基类 */
//     @Injectable()
//     abstract class SystemAdminApi extends SystemApi {
//         constructor(apiInfo: BFChainPC.Api.ApiInfo) {
//             super(apiInfo);
//         }

//         async checkRequestServerOnly(request: BFChainPC.ApiRequest.SYSTEM.AdminCommonParam) {
//             await this.__nodeManagerHelper.verifySystemkey(request.verifyType, request.verifyKey);
//         }

//         abstract async __execute(request: BFChainPC.ApiRequest.SYSTEM.AdminCommonParam): Promise<BFChainPC.Api.ApiReturn>;
//     }

//     /**安全关闭节点 */
//     @Injectable()
//     export abstract class SafetyClose extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SAFETY_CLOSE);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SafetyClose): Promise<BFChainPC.ApiResp.SYSTEM.SafetyClose> {
//             const machineStatus = (await this.__sharedMemoryUtil.getMachineStatusAsync()).machineStatus;
//             const height = await this.__systemLogic.getHeight();
//             const round = bfchainCore.blockHelper.calcRoundByHeight(height);
//             let hasDelegate = false;
//             const __height = round === 1 ? 1 : (round - 1) * bfchainCore.config.blockPerRound;
//             const blocksData = await this.__blockMongoHelper.getBlockByHeight(__height);

//             // 获得配置信息中是否开启打块控制，true：开始打块，false：停止打块
//             const generateBlockEnable = appConfig.startConfig.generateBlockEnable;

//             // 开启打块功能，则需要进行下列判断
//             if (generateBlockEnable) {
//                 // 检查受托人是否是本轮打块受托人，如果是则不能关闭
//                 if (blocksData && blocksData.length > 0) {
//                     const theBlock = blocksData[0];
//                     let nextRoundDelegates: BFChainCore.NextRoundDelegateJSON[];
//                     if (__height === 1) {
//                         nextRoundDelegates = (theBlock as BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>).asset.genesisAsset.nextRoundDelegates;
//                     } else {
//                         nextRoundDelegates = (theBlock as BFChainCore.BlockJSON<BFChainCore.RoundLastBlockAssetJSON>).asset.roundLastAsset.nextRoundDelegates;
//                     }
//                     if (nextRoundDelegates.length === bfchainCore.config.blockPerRound) {
//                         const delegateAddressList = nextRoundDelegates.map(delegate => delegate.address);
//                         const bindAccounts: string[] = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.GETMININGMACHINEGENERATOR, {});
//                         for (const delegate of delegateAddressList) {
//                             if (bindAccounts.includes(delegate)) {
//                                 hasDelegate = true;
//                                 break;
//                             }
//                         }
//                     } else {
//                         logger.warn(nextRoundDelegates);
//                         throw new BusinessCheckException(GET_TARGET_FAIL, {
//                             prop: "__height",
//                             value: __height,
//                             target: "nextRoundDelegates",
//                             function: "SystemShared.safetyClose",
//                         });
//                     }
//                 }

//                 if (hasDelegate) {
//                     throw new BusinessCheckException(GENERATEBLOCK_CANT_CLOSE);
//                 }
//                 if (
//                     machineStatus === constants.machineStatus.verifyBlock ||
//                     machineStatus === constants.machineStatus.createBlock ||
//                     machineStatus === constants.machineStatus.dealTransaction
//                 ) {
//                     throw new BusinessCheckException(FORING_CANT_CLOSE);
//                 }
//             }

//             // 安全退出
//             logger.debug(`安全退出开始!`);

//             // 关闭系统
//             (process as any).send({
//                 cmd: CMD.SAFETYCLOSE,
//                 from: process.env["name"],
//                 isShutdown: request.isShutdown,
//             });

//             ipcHeplers.sendMessage({
//                 to: WORKER.EXTERNALCOMMUNICATE,
//                 cmd: CMD.BCFEMITEVENT,
//                 data: { registEventType: BFChainPC.RegistEventType.receviedBlock },
//             });

//             return { success: true, result: { machineStatus } };
//         }
//     }

//     /**设置节点密码 */
//     @Injectable()
//     export abstract class SetSystemKey extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.SET_SYSTEM_KEY);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetSystemKey): Promise<BFChainPC.ApiResp.SYSTEM.SetSystemKey> {
//             // 矿机新密码
//             let newSystemKey = request.systemKeyNew;
//             // newKeyDecryptEnable = true，使用非对称解密
//             if (request.newKeyDecryptEnable) {
//                 newSystemKey = cryptoUtil.aes256Decrypt(request.systemKeyNew, await this.__nodeManagerHelper.getSystemKey());
//             }

//             // 输入密码中的长度限制为8~20位
//             if (newSystemKey.length < 8 || newSystemKey.length > 20) {
//                 throw new BusinessCheckException(SYSTEMKEY_LENGTH_ERROR);
//             }

//             // 输入密码中不能有空格
//             const spaceReg = /\s/;
//             if (spaceReg.test(newSystemKey) === true) {
//                 throw new BusinessCheckException(SYSTEM_CANT_HAVE_SPACES);
//             }

//             // 输入密码中必须有一个字母和数字
//             const charNumberReg = /^(?=.*?[0-9]+)(?=.*?[a-z]+)(?=.*?[A-Z]+).{8,20}$/;
//             if (charNumberReg.test(newSystemKey) === false) {
//                 throw new BusinessCheckException(SYSTEMKEY_SHOULD_HAVE_CHAR_NUMBER);
//             }
//             const systemKey = crypto
//                 .createHash("sha256")
//                 .update(await this.__nodeManagerHelper.getSystemKey(), "utf8")
//                 .digest("hex");

//             // 旧密码和当前矿机密码不一致要报错
//             if (request.systemKeyOld !== systemKey) {
//                 throw new BusinessCheckException(OLDSYSTEMKEY_WRONG);
//             }

//             // sha256对新密码进行加密
//             const systemKeyNewCrypto = crypto
//                 .createHash("sha256")
//                 .update(newSystemKey, "utf8")
//                 .digest("hex");

//             // 旧密码和新密码一致要报错
//             if (request.systemKeyOld === systemKeyNewCrypto) {
//                 throw new BusinessCheckException(NEWKEY_OLDKEY_SAME);
//             }

//             // 设置新密码
//             await this.__nodeManagerHelper.setSystemKey(newSystemKey);

//             return { success: true, result: true };
//         }
//     }

//     /**验证节点密码 */
//     @Injectable()
//     export abstract class VerifySystemKey extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.VERIFY_SYSTEM_KEY);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.VerifySystemKey): Promise<BFChainPC.ApiResp.SYSTEM.VerifySystemKey> {
//             const systemKey = await this.__nodeManagerHelper.getSystemKey();
//             // 如果没有矿机密码，则使用初始化矿机密码
//             const cryptoSystemKey = crypto
//                 .createHash("sha256")
//                 .update(systemKey, "utf8")
//                 .digest("hex");

//             // 没有设置初始化矿机密码要出错
//             if (!cryptoSystemKey) {
//                 throw new BusinessCheckException(SYSTEMKEY_NOT_SET);
//             }

//             // 验证签名的正确性
//             if (request.systemKey !== cryptoSystemKey) {
//                 throw new BusinessCheckException(SYSTEMKEY_INCORRECT);
//             }
//             return { success: true, result: true };
//         }
//     }

//     /**增加节点管理员 */
//     @Injectable()
//     export abstract class AddSystemAdmin extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.ADD_SYSTEM_ADMIN);
//         }

//         async checkRequest(request: BFChainPC.ApiRequest.SYSTEM.AddSystemAdmin) {
//             // 地址是否有效，增加时必须要有systemAdminAddress
//             if (!request.systemAdminAddress || !(await this.accountBaseHelper.isAddress(request.systemAdminAddress))) {
//                 throw new BusinessCheckException(INVALID_SYSTEM_ADMIN_ADDRESS);
//             }
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.AddSystemAdmin): Promise<BFChainPC.ApiResp.SYSTEM.AddSystemAdmin> {
//             let systemAdmin: BFChainPC.SystemInfo.SystemAdminModel = {
//                 adminAddress: "",
//                 adminAddTime: 0,
//                 adminName: "",
//             };

//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, request.systemKey);
//             const systemAdmins = await this.__sharedMemoryUtil.getAllSystemAdminAsync();

//             for (const key in systemAdmins) {
//                 const systemAdminAddress = systemAdmins[key];
//                 if (request.systemAdminAddress === systemAdminAddress.adminAddress) {
//                     throw new BusinessCheckException(ADMIN_ALREADY_EXIST);
//                 }
//             }

//             // 判断该账户是否存在
//             const account = await this.__accountsProcessHelper.getAccountInfo(request.systemAdminAddress);
//             let adminName: string = "";
//             if (!account) {
//                 throw new BusinessCheckException(ACCOUNT_NOT_FOUND, `the system admin account ${request.systemAdminAddress} not found`);
//             } else {
//                 adminName = account.username || "";
//             }

//             // 获得系统管理员
//             systemAdmin = {
//                 adminAddress: request.systemAdminAddress,
//                 adminAddTime: bfchainCore.time.now(),
//                 adminName,
//             };
//             await this.__sharedMemoryUtil.setSystemAdminAsync(systemAdmin);

//             return { success: true, result: { systemAdmin } };
//         }
//     }

//     /**获得节点管理员 */
//     @Injectable()
//     export abstract class GetSystemAdmin extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_ADMIN);
//         }

//         async checkRequest(request: BFChainPC.ApiRequest.SYSTEM.GetSystemAdmin) {
//             // 地址是否有效，systemAdminAddress可为空
//             if (request.systemAdminAddress && !(await this.accountBaseHelper.isAddress(request.systemAdminAddress))) {
//                 throw new BusinessCheckException(INVALID_SYSTEM_ADMIN_ADDRESS);
//             }
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemAdmin): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemAdmin> {
//             const { systemKey, systemAdminAddress } = request;
//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, systemKey);
//             let systemAdmin: BFChainPC.SystemInfo.SystemAdminModel[];
//             if (systemAdminAddress) {
//                 // 判断该账户是否存在
//                 const account = await this.__accountsProcessHelper.getAccountInfo(systemAdminAddress);

//                 if (!account) {
//                     throw new BusinessCheckException(ACCOUNT_NOT_FOUND, `getSystemAdmin not found ${systemAdminAddress}`);
//                 }
//                 const model = await this.__sharedMemoryUtil.getSystemAdminAsync(systemAdminAddress);
//                 systemAdmin = model ? [model] : [];
//             }
//             systemAdmin = await this.__sharedMemoryUtil.getAllSystemAdminAsync();
//             return { success: true, result: { systemAdmin } };
//         }
//     }

//     /**验证节点管理员 */
//     @Injectable()
//     export abstract class VerifySystemAdmin extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.VERIFY_SYSTEM_ADMIN);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.VerifySystemAdmin): Promise<BFChainPC.ApiResp.SYSTEM.VerifySystemAdmin> {
//             const result = await this.__nodeManagerHelper.verifySystemAdmin(request.cryptoAdminAddress);
//             return { success: true, result };
//         }
//     }

//     /**删除节点管理员 */
//     @Injectable()
//     export abstract class DelSystemAdmin extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.DEL_SYSTEM_ADMIN);
//         }

//         async checkRequest(request: BFChainPC.ApiRequest.SYSTEM.DelSystemAdmin) {
//             // 地址是否有效，删除时必须要有systemAdminAddress
//             if (!request.systemAdminAddress || !(await this.accountBaseHelper.isAddress(request.systemAdminAddress))) {
//                 throw new BusinessCheckException(INVALID_SYSTEM_ADMIN_ADDRESS);
//             }
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.DelSystemAdmin): Promise<BFChainPC.ApiResp.SYSTEM.DelSystemAdmin> {
//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, request.systemKey);
//             // 删除矿机管理员
//             await this.__sharedMemoryUtil.deleteSystemAdminAsync(request.systemAdminAddress);
//             return { success: true, result: true };
//         }
//     }

//     /**重置节点管理员 */
//     @Injectable()
//     export abstract class ResetSystemAdmin extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.RESET_SYSTEM_ADMIN);
//         }

//         async checkRequest(request: BFChainPC.ApiRequest.SYSTEM.ResetSystemAdmin) {
//             // 校验地址的正确性
//             for (const address of request.systemAdminAddresses) {
//                 if (address && !(await this.accountBaseHelper.isAddress(address))) {
//                     throw new BusinessCheckException(INVALID_SYSTEM_ADMIN_ADDRESS);
//                 }
//             }
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.ResetSystemAdmin): Promise<BFChainPC.ApiResp.SYSTEM.ResetSystemAdmin> {
//             let systemAdmin: BFChainPC.SystemInfo.SystemAdminModel = {
//                 adminAddress: "",
//                 adminAddTime: 0,
//                 adminName: "",
//             };

//             // 获取所有管理员
//             const systemAdmins: BFChainPC.SystemInfo.SystemAdminModel[] = [];
//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, request.systemKey);

//             for (const address of request.systemAdminAddresses) {
//                 // 判断该账户是否存在
//                 const account = await this.__accountsProcessHelper.getAccountInfo(address);
//                 let adminName: string = "";
//                 if (!account) {
//                     throw new BusinessCheckException(ACCOUNT_NOT_FOUND, `the system admin account ${address} not found`);
//                 } else {
//                     adminName = account.username || "";
//                 }

//                 // 获得系统管理员
//                 systemAdmin = {
//                     adminAddress: address,
//                     adminAddTime: bfchainCore.time.now(),
//                     adminName,
//                 };

//                 systemAdmins.push(systemAdmin);
//             }

//             // 重置所有系统管理员
//             await this.__sharedMemoryUtil.resetSystemAdminAsync(systemAdmins);

//             const result = { systemAdmins };
//             return { success: true, result };
//         }
//     }

//     /**绑定节点账户 */
//     @Injectable()
//     export abstract class BindingAccount extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.BINDING_ACCOUNT);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.BindingAccount): Promise<BFChainPC.ApiResp.SYSTEM.BindingAccount> {
//             const { isReady } = await this.getBlockChainStatus();
//             if (isReady !== true) {
//                 throw new BusinessCheckException(i18n.__({ code: 637, phrase: "BlockChain is not ready" }));
//             }
//             // 验证systemKey的正确性
//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, request.systemKey);

//             const systemkey = await this.__nodeManagerHelper.getSystemKey();
//             const injectInfo = await this.__sharedMemoryUtil.getInjectAddressAsync();
//             if (injectInfo) {
//                 const message = i18n.__({
//                     code: 631,
//                     phrase: "You have already binding the address",
//                 });
//                 // throw new BusinessCheckException(message);
//                 logger.warn(message);
//             }
//             // 使用AES256得到解密后的私钥
//             const secret = cryptoUtil.aes256Decrypt(request.cryptoSecret, systemkey);

//             const keypair = edHelper.MakeKeypair(
//                 crypto
//                     .createHash("sha256")
//                     .update(secret, "utf8")
//                     .digest()
//             );

//             const delegatePublicKey = getHexFromArrayBuffer(keypair.publicKey);
//             if (!this.baseHelper.isValidPublicKey(delegatePublicKey)) {
//                 throw new BusinessCheckException(INVALID_PUBLICKEY, delegatePublicKey);
//             }

//             const accountInfoAndAsset = await this.__delegateAccount.bindingAccount(secret);
//             const accountKeypairs: BFChainPC.Accounts.AccountKeypairsModel = { keypair };
//             if (request.secondSecret) {
//                 const secondSecret = cryptoUtil.aes256Decrypt(request.secondSecret, systemkey);
//                 const secondKeypair = await this.accountBaseHelper.createSecondSecretKeypair(secret, secondSecret);
//                 accountKeypairs.secondKeypair = secondKeypair;
//             }
//             // 绑定私钥
//             const address = accountInfoAndAsset.accountInfo.address;
//             const injectResult = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.INJECTDELEGATES, {
//                 address,
//                 accountKeypairs,
//                 mutli: true,
//             });

//             if (injectResult !== true) {
//                 logger.warn(injectResult);
//             }
//             const result = { accountInfoAndAsset: baseUtils.formatData(accountInfoAndAsset) };
//             return { success: true, result };
//         }
//     }

//     /**批量绑定受托人 */
//     @Injectable()
//     export abstract class SetSystemDelegateMutli extends SystemApi {
//         private hasBindingAccount = false;
//         constructor() {
//             super(API.SYSTEM.SET_SYSTEM_DELEGATE_MULTI);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetSystemDelegateMutli): Promise<BFChainPC.ApiResp.SYSTEM.SetSystemDelegateMutli> {
//             await this.__nodeManagerHelper.verifySystemkey(SystemVerifyType.SYSTEM_OWNER, request.systemKey);
//             const systemkey = await this.__nodeManagerHelper.getSystemKey();

//             // 使用AES256得到解密后的私钥
//             const secret = cryptoUtil.aes256Decrypt(request.cryptoSecret, systemkey);
//             if (process.env["DEV"] !== "true") {
//                 if (!this.hasBindingAccount) {
//                     this.hasBindingAccount = true;
//                     // 未绑定过的，注入网络身份
//                     const accountInfoAndAsset = await this.__delegateAccount.bindingAccount(secret);
//                     logger.debug(`inject ${accountInfoAndAsset.accountInfo.address}`);
//                 }
//             }
//             const keypair = edHelper.MakeKeypair(
//                 crypto
//                     .createHash("sha256")
//                     .update(secret, "utf8")
//                     .digest()
//             );

//             const delegatePublicKey = getHexFromArrayBuffer(keypair.publicKey);
//             if (!this.baseHelper.isValidPublicKey(delegatePublicKey)) {
//                 throw new BusinessCheckException(INVALID_PUBLICKEY, delegatePublicKey);
//             }

//             const delegateAddress = await bfchainCore.accountBaseHelper.getAddressFromPublicKeyString(delegatePublicKey);

//             const accountKeypairs: BFChainPC.Accounts.AccountKeypairsModel = {
//                 keypair,
//             };
//             if (request.secondSecret) {
//                 const secondSecret = cryptoUtil.aes256Decrypt(request.secondSecret, systemkey);
//                 const secondKeypair = await this.accountBaseHelper.createSecondSecretKeypair(secret, secondSecret);
//                 accountKeypairs.secondKeypair = secondKeypair;
//             }
//             // 设置锻造者
//             const injectResult = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.INJECTDELEGATES, {
//                 address: delegateAddress,
//                 accountKeypairs,
//                 mutli: true,
//             });

//             if (injectResult !== true) {
//                 throw new BusinessCheckException(`bind delegate ${delegateAddress} failed ${injectResult}`);
//             }

//             const delegateAddTime = bfchainCore.time.now();

//             const result = { delegateAddress, delegateAddTime };
//             return { success: true, result };
//         }
//     }

//     /**获得节点受托人 */
//     @Injectable()
//     export abstract class GetSystemDelegate extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_DELEGATE);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemDelegate): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemDelegate> {
//             const injectAddressInfo = await this.__sharedMemoryUtil.getInjectAddressAsync();
//             if (injectAddressInfo) {
//                 const accounInfo = await this.__accountsProcessHelper.getAccountInfo(injectAddressInfo.address);
//                 if (accounInfo && accounInfo.username) {
//                     injectAddressInfo.name = accounInfo.username;
//                 }
//             }
//             return { success: true, result: injectAddressInfo };
//         }
//     }

//     /**查询该矿机所有绑定受托人 */
//     @Injectable()
//     export abstract class GetInjectGenerators extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_INJECT_GENERATORS);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetInjectGenerators): Promise<BFChainPC.ApiResp.SYSTEM.GetInjectGenerators> {
//             const delegates = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.GETMININGMACHINEGENERATOR, {});
//             const currentHeight = (await this.__systemLogic.getHeight()) + 1;
//             const injectGenerators: { address: string; username?: string }[] = [];
//             for (const address of delegates) {
//                 const accountAssetAndInfo = await this.__accountsProcessHelper.getAccountInfoAndAsset(address, currentHeight);
//                 injectGenerators.push({ address, username: accountAssetAndInfo ? accountAssetAndInfo.accountInfo.username : undefined });
//             }

//             const result = { injectGenerators };
//             return { success: true, result };
//         }
//     }

//     /**查询该矿机绑定受托人详情信息（余额，收益，锻造区块数，地址） */
//     @Injectable()
//     export abstract class GetSystemDelegateDetail extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_DELEGATE_DETAIL);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemDelegateDetail): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemDelegateDetail> {
//             const delegates: string[] = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.GETMININGMACHINEGENERATOR, {});
//             if (!delegates.includes(request.address)) {
//                 throw new BusinessCheckException(`${request.address} is not in delegates`);
//             }
//             // 通过地址获取受托人详情(余额，收益，锻造区块数，地址)
//             const result = await this.__systemLogic.getDelegateDetailInfo(request.address);
//             return { success: true, result };
//         }
//     }

//     /**获得节点详情（累计收益，当前高度，当前版本） */
//     @Injectable()
//     export abstract class GetSystemNodeInfo extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_NODEINFO);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemNodeInfo): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemNodeInfo> {
//             const nodeInfo: BFChainPC.SystemInfo.SystemNodeInfoModel = {
//                 addressList: [],
//                 accumulativeReward: "0",
//                 height: 0,
//                 version: "",
//                 chainName: bfchainCore.config.chainName,
//                 magic: bfchainCore.config.magic,
//                 gensisBlockSignature: bfchainCore.config.genesisBlock.signature,
//                 osType: os.platform(),
//             };

//             nodeInfo.height = await this.__systemLogic.getHeight();

//             if (process.env["VERSION"]) {
//                 nodeInfo.version = process.env["VERSION"];
//             }

//             const addressList = await ipcHeplers.ipcReqAsync(WORKER.FORGER, CMD.GETMININGMACHINEGENERATOR, {});

//             let accumulativeReward = 0;

//             // 通过地址获取受托人详情(余额，收益，锻造区块数，地址)
//             for (let address of addressList) {
//                 const delegateDetailInfo = await this.__systemLogic.getDelegateDetailInfo(address);
//                 nodeInfo.addressList.push({ address, username: delegateDetailInfo.username, isDelegate: delegateDetailInfo.isDelegate });
//                 accumulativeReward += Number(delegateDetailInfo.reward);
//             }

//             nodeInfo.accumulativeReward = accumulativeReward.toString();

//             const result = { nodeInfo };
//             return { success: true, result };
//         }
//     }

//     /**节点信息查询 */
//     @Injectable()
//     export abstract class MiningMachineInfo extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.MINING_MACHINE_INFO);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.MiningMachineInfo): Promise<BFChainPC.ApiResp.SYSTEM.MiningMachineInfo> {
//             const result = { data: await this.__systemLogic.miningMachineInfo() };
//             return { success: true, result };
//         }
//     }

//     /**设置节点配置信息 */
//     @Injectable()
//     export abstract class SetSystemConfig extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SET_SYSTEM_CONFIG);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetSystemConfig): Promise<BFChainPC.ApiResp.SYSTEM.SetSystemConfig> {
//             const config = request.config;
//             this.__checkSystemConfig(config);
//             this.__setSystemConfig(appConfig, config);
//             // 更改配置信息里面的数据
//             configFactory.setAppConfig(appConfig, true);
//             // 通知所有进程修改配置文件
//             ipcHeplers.sendMessage({
//                 to: "*",
//                 data: {
//                     appConfig,
//                 },
//                 cmd: CMD.SETSYSTEMCONFIGBROADCAST,
//             });
//             return { success: true, result: true };
//         }

//         private __checkSystemConfig(config: AllPartial<BFChainPC.SystemInfo.SystemConfigInfoDetail>) {
//             const includeKeys = [
//                 "startConfig",
//                 "chainPort",
//                 "coreForProcess",
//                 "transactionConfig",
//                 "logConfig",
//                 "networkConfig",
//                 "flowControlConfig",
//                 "noticeConfig",
//                 "diskMonitorConfig",
//                 "serviceConfig",
//             ];
//             for (const key in config) {
//                 if (!includeKeys.includes(key)) {
//                     throw new BusinessCheckException(`config field ${key} can't be changed`);
//                 }
//             }
//         }

//         private __setSystemConfig(appConfig: any, config: any) {
//             if (!appConfig) {
//                 return;
//             }
//             for (const key in config) {
//                 const value = config[key];
//                 this.__checkValue(key, value);
//                 if (value instanceof Object && !Array.isArray(value)) {
//                     this.__setSystemConfig(appConfig[key], value);
//                 } else {
//                     if (appConfig[key] !== undefined) {
//                         appConfig[key] = value;
//                     }
//                 }
//             }
//         }

//         private __checkValue(key: string, value: any) {
//             switch (key) {
//                 case "consoleLogLevel":
//                 case "fileLogLevel":
//                     if (["info", "warn", "error"].indexOf(value) === -1) {
//                         const message = i18n.__({ code: 612, phrase: "The consoleLogLevel is out of range" });
//                         throw new BusinessCheckException(message);
//                     }
//                     break;
//                 case "autoVote":
//                     const { productivityPercent, forgedBlocksPercent, applyTxPercent, votePercent, newDelegatePercent } = value as AllPartial<
//                         BFChainPC.Config.ConfigModel["transactionConfig"]["autoVote"]
//                     >;
//                     if (
//                         productivityPercent !== undefined ||
//                         forgedBlocksPercent !== undefined ||
//                         applyTxPercent !== undefined ||
//                         votePercent !== undefined ||
//                         newDelegatePercent !== undefined
//                     ) {
//                         if (
//                             (productivityPercent ?? 0) + (forgedBlocksPercent ?? 0) + (applyTxPercent ?? 0) + (votePercent ?? 0) + (newDelegatePercent ?? 0) !==
//                             100
//                         ) {
//                             throw new BusinessCheckException(`autovote percent sum should be 100`);
//                         }
//                     }
//                     break;
//                 case "coreForProcess":
//                     const numCPUs = os.cpus().length;
//                     const { coreNumForDealTransaction, coreNumForMemInfo, coreNumForUntreatedTrs } = value as AllPartial<
//                         BFChainPC.Config.ConfigModel["coreForProcess"]
//                     >;
//                     if (coreNumForDealTransaction !== undefined) {
//                         if (coreNumForDealTransaction > numCPUs * 2) {
//                             throw new BusinessCheckException(
//                                 `can not set coreNumForDealTransaction for ${coreNumForDealTransaction}. Because cpu is ${numCPUs}`
//                             );
//                         }
//                     }
//                     if (coreNumForMemInfo !== undefined) {
//                         if (coreNumForMemInfo > numCPUs * 2) {
//                             throw new BusinessCheckException(`can not set coreNumForMemInfo for ${coreNumForMemInfo}. Because cpu is ${numCPUs}`);
//                         }
//                     }
//                     if (coreNumForUntreatedTrs !== undefined) {
//                         if (coreNumForUntreatedTrs > numCPUs * 2) {
//                             throw new BusinessCheckException(`can not set coreNumForUntreatedTrs for ${coreNumForUntreatedTrs}. Because cpu is ${numCPUs}`);
//                         }
//                     }
//                     break;
//                 default:
//                     break;
//             }
//         }
//     }

//     /**获得节点配置信息 */
//     @Injectable()
//     export abstract class GetSystemConfigInfoDetail extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_CONFIG_INFO_DETAIL);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemConfigInfoDetail): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemConfigInfoDetail> {
//             const result = this.__systemLogic.getSystemConfigInfoDetail();
//             return { success: true, result };
//         }
//     }

//     /**获得节点状态（实时信息） */
//     @Injectable()
//     export abstract class GetRuntimeState extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_RUNTIME_STATE);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetRuntimeState): Promise<BFChainPC.ApiResp.SYSTEM.GetRuntimeState> {
//             const result = await this.__systemLogic.getRuntimeState();
//             return { success: true, result };
//         }
//     }

//     /**获得节点访问统计信息 */
//     @Injectable()
//     export abstract class GetSystemMonitor extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_MONITOR);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemMonitor): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemMonitor> {
//             const allowMonitorType = new Set([
//                 "requestIpMonitorInfo",
//                 "requestMethodInfo",
//                 "requestPathInfo",
//                 "requestApiUrlInfo",
//                 "requestMethodNameInfo",
//                 "requestAccountInfo",
//                 "transaction",
//                 "trsCount",
//                 "blockCount",
//             ]);
//             if (request.monitorType && !allowMonitorType.has(request.monitorType)) {
//                 throw new BusinessCheckException(MONITOR_WRONG);
//             }

//             // 获得系统监控基本信息
//             const systemMonitor = await this.__systemLogic.getSystemMonitor(request);
//             return { success: true, result: { systemMonitor } };
//         }
//     }

//     /**获得节点运行日志类型 */
//     @Injectable()
//     export abstract class GetSystemLoggerType extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_LOGGER_TYPE);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemLoggerType): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemLoggerType> {
//             const result = { loggerType: this.__systemLogic.getloggerType() };
//             return { success: true, result };
//         }
//     }

//     /**获得节点运行日志列表 */
//     @Injectable()
//     export abstract class GetSystemLoggerList extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_LOGGER_LIST);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemLoggerList): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemLoggerList> {
//             let loggerList = this.__systemLogic.getLoggerList(request.loggerType);
//             const result = { loggerList };
//             return { success: true, result };
//         }
//     }

//     /**获得节点运行日志内容 */
//     @Injectable()
//     export abstract class GetSystemLoggerDetail extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_LOGGER_DETAIL);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemLoggerDetail): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemLoggerDetail> {
//             const result = await this.__systemLogic.getLoggerDetail(request);
//             return { success: true, result };
//         }
//     }

//     /**删除矿机运行日志 */
//     @Injectable()
//     export abstract class DelSystemLogger extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.DEL_SYSTEM_LOGGER);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.DelSystemLogger): Promise<BFChainPC.ApiResp.SYSTEM.DelSystemLogger> {
//             const filePath = path.join(process.cwd(), "/logs/" + request.loggerName);
//             if (fs.existsSync(filePath)) {
//                 const stats = fs.statSync(filePath);
//                 // 判断文件是否被使用
//                 // 更改文件状态 === 修改文件状态的时间戳一致，表示还在使用中
//                 if (stats.mtimeMs === stats.ctimeMs) {
//                     const message = i18n.__({ code: 635, phrase: "The file is used by a process, and can not delete" });
//                     throw new BusinessCheckException(message);
//                 } else {
//                     baseUtils.deleteFile(filePath);
//                 }
//             } else {
//                 const message = i18n.__({ code: 636, phrase: "The file does not exist" });
//                 throw new BusinessCheckException(message);
//             }
//             return { success: true, result: true };
//         }
//     }

//     /**获得节点邮箱地址 */
//     @Injectable()
//     export abstract class GetEmailAddress extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_EMAIL_ADDRESS);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetEmailAddress): Promise<BFChainPC.ApiResp.SYSTEM.GetEmailAddress> {
//             // 获取邮箱配置信息
//             let eMailInfo: BFChainPC.SystemInfo.EMailInfo | undefined;
//             // 遍历所有邮箱地址
//             for (const email of this.__systemLogic.getEmails()) {
//                 // 确认这次邮箱的身份者类型
//                 if (request.verifyType === SystemVerifyType.SYSTEM_OWNER && email.verifyType === SystemVerifyType.SYSTEM_OWNER) {
//                     eMailInfo = email;
//                 } else if (request.verifyType === SystemVerifyType.SYSTEM_ADMIN && email.verifyType === SystemVerifyType.SYSTEM_ADMIN) {
//                     // 身份为管理者类型并且管理员地址要一致
//                     if (email.systemOwner === request.verifyKey) {
//                         eMailInfo = email;
//                     }
//                 }
//             }

//             let result: BFChainPC.SystemInfo.EMailAddressInfo = {
//                 emailToAddress: "",
//                 emailFromAddress: "",
//                 emailConfig: Object.create(null),
//             };

//             if (eMailInfo) {
//                 // throw new BusinessCheckException(`no email address`);
//                 result = {
//                     emailToAddress: eMailInfo.emailToAddress,
//                     emailFromAddress: eMailInfo.emailFromAddress,
//                     emailConfig: eMailInfo.emailConfig,
//                 };
//             }
//             return { success: true, result };
//         }
//     }

//     /**设置节点邮箱地址 */
//     @Injectable()
//     export abstract class SetEmailAddress extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SET_EMAIL_ADDRESS);
//         }

//         async checkRequest(request: BFChainPC.ApiRequest.SYSTEM.SetEmailAddress) {
//             const { emailToAddress, emailFromAddress, emailConfig } = request;
//             // 发送邮箱格式校验
//             if (!(await this.__nodeManagerHelper.verifyEmailAddress(emailFromAddress))) {
//                 throw new BusinessCheckException(EMAIL_ADDRESS_WRONG, emailFromAddress);
//             }
//             // 接收邮箱校验
//             if (!(await this.__nodeManagerHelper.verifyEmailAddress(emailToAddress))) {
//                 throw new BusinessCheckException(EMAIL_ADDRESS_WRONG, emailToAddress);
//             }
//             // 邮箱类型检测
//             if (Object.keys(EmailType).indexOf(emailConfig.type) === -1) {
//                 throw new BusinessCheckException(EMAIL_TYPE_WRONG, emailConfig.type);
//             }
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetEmailAddress): Promise<BFChainPC.ApiResp.SYSTEM.SetEmailAddress> {
//             const { verifyType, verifyKey, emailToAddress, emailFromAddress, emailConfig } = request;
//             if (emailToAddress && emailToAddress.length !== 0 && emailFromAddress && emailFromAddress.length !== 0 && emailConfig) {
//                 let emailExistFlag = false;
//                 // 遍历所有邮箱地址
//                 for (const email of this.__systemLogic.getEmails()) {
//                     // 确认这次邮箱的身份者类型
//                     if (verifyType === SystemVerifyType.SYSTEM_OWNER) {
//                         // 矿机主则直接修改邮箱的地址
//                         if (email.verifyType === SystemVerifyType.SYSTEM_OWNER) {
//                             email.emailToAddress = emailToAddress;
//                             email.emailFromAddress = emailFromAddress;
//                             email.emailConfig = emailConfig;
//                             emailExistFlag = true;
//                         }
//                     } else if (verifyType === SystemVerifyType.SYSTEM_ADMIN) {
//                         // 身份为管理者类型并且管理员地址要一致
//                         if (email.verifyType === SystemVerifyType.SYSTEM_ADMIN && email.systemOwner === verifyKey) {
//                             email.emailToAddress = emailToAddress;
//                             email.emailFromAddress = emailFromAddress;
//                             email.emailConfig = emailConfig;
//                             emailExistFlag = true;
//                         }
//                     }
//                 }

//                 // 如果该身份（矿机主或者管理员对应的身份）的邮箱没有存储，则存储数据
//                 if (!emailExistFlag) {
//                     const systemOwner = verifyType === SystemVerifyType.SYSTEM_OWNER ? "systemOwner" : verifyKey;
//                     this.__systemLogic.addEmail({
//                         verifyType,
//                         systemOwner,
//                         emailToAddress,
//                         emailFromAddress,
//                         emailConfig,
//                     });
//                 }
//             }

//             return { success: true, result: true };
//         }
//     }

//     /**通过节点私钥验证节点受托人 */
//     @Injectable()
//     export abstract class VerifySystemSecret extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.VERIFY_SYSTEM_SECRET);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.VerifySystemSecret): Promise<BFChainPC.ApiResp.SYSTEM.VerifySystemSecret> {
//             const result = await this.__nodeManagerHelper.verifySystemDelegate(request.cryptoSecret);
//             return { success: true, result };
//         }
//     }

//     /**设置节点访问白名单 */
//     @Injectable()
//     export abstract class SetSystemWhiteList extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SET_SYSTEM_WHITELIST);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetSystemWhiteList): Promise<BFChainPC.ApiResp.SYSTEM.SetSystemWhiteList> {
//             this.__systemLogic.addWhileList(request.whiteList);
//             return { success: true, result: true };
//         }
//     }

//     /**获得节点访问白名单 */
//     @Injectable()
//     export abstract class GetSystemWhiteList extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_WHITELIST);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetSystemWhiteList): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemWhiteList> {
//             const result = { whileList: this.__systemLogic.getWhileList() };
//             return { success: true, result };
//         }
//     }

//     /**删除节点访问白名单 */
//     @Injectable()
//     export abstract class DelSystemWhiteList extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.DEL_SYSTEM_WHITELIST);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.DelSystemWhiteList): Promise<BFChainPC.ApiResp.SYSTEM.DelSystemWhiteList> {
//             this.__systemLogic.delWhileList(request.whiteList);
//             return { success: true, result: true };
//         }
//     }

//     /**获得节点进程的网络相关信息 */
//     @Injectable()
//     export abstract class GetProcessNetwork extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_PROCESS_NETWORK);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetProcessNetwork): Promise<BFChainPC.ApiResp.SYSTEM.GetProcessNetwork> {
//             const { processType, limit, offset } = request;
//             const result = await this.__systemLogic.getProcessNetwork(processType, limit, offset);
//             return { success: true, result };
//         }
//     }

//     /**获得节点进程CPU信息 */
//     @Injectable()
//     export abstract class GetProcessCPU extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_PROCESS_CPU);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetProcessCPU): Promise<BFChainPC.ApiResp.SYSTEM.GetProcessCPU> {
//             const { processType, limit, offset } = request;
//             const result = await this.__systemLogic.getProcessCPU(processType, limit, offset);
//             return { success: true, result };
//         }
//     }

//     /**获得节点进程内存信息 */
//     @Injectable()
//     export abstract class GetProcessMemory extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_PROCESS_MEMORY);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetProcessMemory): Promise<BFChainPC.ApiResp.SYSTEM.GetProcessMemory> {
//             const { processType, limit, offset } = request;
//             const result = await this.__systemLogic.getProcessMemory(processType, limit, offset);
//             return { success: true, result };
//         }
//     }

//     /**定时发送节点状态 */
//     @Injectable()
//     export abstract class SystemStatus extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SYSTEM_STATUS);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SystemStatus): Promise<BFChainPC.ApiResp.SYSTEM.SystemStatus> {
//             const result = { systemStatus: await this.__systemLogic.systemStatusData() };
//             return { success: true, result };
//         }
//     }

//     /**定时发送节点CPU，内存，网络信息 */
//     @Injectable()
//     export abstract class SystemProcess extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SYSTEM_PROCESS);
//         }

//         async executeByVersion(request: BFChainPC.ApiRequest.SYSTEM.SystemProcess, version: number) {
//             if (version <= ApiVersionType.V0_1_0) {
//                 return await this.v0_1_0(request);
//             }
//             if (version <= ApiVersionType.V0_2_0) {
//                 return await this.v0_2_0(request);
//             }
//             if (version <= ApiVersionType.V0_3_0) {
//                 return await this.deprecation(version);
//             }
//             return await this.__execute(request);
//         }

//         async v0_1_0(request: BFChainPC.ApiRequest.SYSTEM.SystemProcess) {
//             const result = await this.__execute(request);
//             return { success: result.success, result: { usageCPU: result.result.systemProcess.usageCPU } };
//         }

//         async v0_2_0(request: BFChainPC.ApiRequest.SYSTEM.SystemProcess) {
//             const result = await this.__execute(request);
//             return { success: result.success, result: { usageMemory: result.result.systemProcess.usageMemory } };
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SystemProcess): Promise<BFChainPC.ApiResp.SYSTEM.SystemProcess> {
//             const result = { systemProcess: await this.__systemLogic.systemProcess() };
//             return { success: true, result };
//         }
//     }

//     /**获取矿机的信息，根据传入参数不同，返回不同形式的矿机信息 */
//     @Injectable()
//     export abstract class GetSystemInfo extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.GET_SYSTEM_INFO);
//         }

//         async __execute(): Promise<BFChainPC.ApiResp.SYSTEM.GetSystemInfo> {
//             const result = { data: await this.__systemLogic.getSystemInfo() };
//             return { success: true, result };
//         }
//     }

//     /**获得节点状态 */
//     @Injectable()
//     export abstract class GetMachineStatus extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.GET_MACHINE_STATUS);
//         }

//         async __execute(): Promise<BFChainPC.ApiResp.SYSTEM.GetMachineStatus> {
//             const result: {
//                 machineStatus: number;
//                 height?: number;
//             } = {
//                 machineStatus: (await this.__sharedMemoryUtil.getMachineStatusAsync()).machineStatus,
//             };
//             try {
//                 result.height = await this.__systemLogic.getHeight();
//             } catch (err) {
//                 logger.error(`the system machineStatus error = ${err}`);
//             }
//             return { success: true, result };
//         }
//     }

//     /**获得Bfchain版本号 */
//     @Injectable()
//     export abstract class GetBfchainVersion extends SystemApi {
//         constructor() {
//             super(API.SYSTEM.GET_BFCHAIN_VERSION);
//         }

//         async __execute(): Promise<BFChainPC.ApiResp.SYSTEM.GetBfchainVersion> {
//             // 默认版本
//             let version = "";
//             if (process.env["VERSION"]) {
//                 version = process.env["VERSION"];
//             }
//             return { success: true, result: { version } };
//         }
//     }

//     /**获取服务市场信息 */
//     @Injectable()
//     export abstract class GetServiceInfo extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SERVICE_INFO);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetServiceInfo): Promise<BFChainPC.ApiResp.SYSTEM.GetServiceInfo> {
//             const result = await this.__systemLogic.getServiceInfo(request.dappid);
//             return { success: true, result };
//         }
//     }

//     /**获取服务市场Peer信息 */
//     @Injectable()
//     export abstract class GetServicePeerInfo extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.GET_SERVICE_PEERINFO);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.GetServicePeerInfo): Promise<BFChainPC.ApiResp.SYSTEM.GetServicePeerInfo> {
//             const result = await this.__systemLogic.getServicePeerInfo(request.dappid);
//             return { success: true, result };
//         }
//     }

//     /**设置是否开启自动socket发送 */
//     @Injectable()
//     export abstract class SetSocketEmitEnable extends SystemAdminApi {
//         constructor() {
//             super(API.SYSTEM.SET_SOCKET_EMIT_ENABLE);
//         }

//         async __execute(request: BFChainPC.ApiRequest.SYSTEM.SetSocketEmitEnable): Promise<BFChainPC.ApiResp.SYSTEM.SetSocketEmitEnable> {
//             if (!request.socket) {
//                 throw new BusinessCheckException(`socket is undefined`);
//             }
//             this.__systemLogic.setSocketEmitControl(request.systemStatusEnable, request.systemProcessEnable, request.socket);
//             return { success: true, result: true };
//         }
//     }
// }
