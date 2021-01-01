// import { Injectable, Inject } from "@bfchain/util";
// import * as fs from "fs";
// import { BFChainPcExceptionGenerator } from "../../../helpers/moduleError/expceptionGenerator";
// import { PROP_SHOULD_LTE_FIELD, PROP_IS_INVALID, PROP_IS_REQUIRE, GET_TARGET_FAIL, SHOULD_NOT_EXIST } from "../../../helpers/moduleError/pcErrorCode";
// import {
//     myTransferAsset,
//     mySignature,
//     myUsername,
//     myDelegate,
//     myAcceptVote,
//     myRejectVote,
//     myVote,
//     myDApp,
//     myDAppPurchasing,
//     myMark,
//     myIssueAsset,
//     myDestoryAsset,
//     myToExchangeAsset,
//     myBeExchangeAsset,
//     myToExchangeSpecialAsset,
//     myBeExchangeSpecialAsset,
//     myGiftAsset,
//     myGrabAsset,
//     myTrustAsset,
//     mySignForAsset,
//     myEmigrateAsset,
//     myImmigrateAsset,
//     myLocationName,
//     mySetLnsManager,
//     mySetLnsRecordValue,
//     myRegisterChain,
// } from "@bfchain/coretools";
// import { ipcHeplers } from "../../../helpers/processHelpers";
// import { WORKER, CMD } from "../../../cluster/common";
// import { configFactory } from "../../../baseHelpers/config/configFactory";
// import { BASIC_API } from "./basicApi";
// import { DAPP_TYPE, ConfigHelper, BFChainCoreFactory, RECORD_OPERATION_TYPE, RECORD_TYPE, RANGE_TYPE } from "@bfchain/core";
// import { API } from "../../constant/apiConst";
// import { baseUtils } from "../../../helpers/utils/baseUtils";
// const appConfig = configFactory.getAppConfig();
// const { string2Number } = baseUtils;
// const { ArgumentIllegalException, BusinessCheckException } = BFChainPcExceptionGenerator("bfchain-pc:api", __filename);

// export namespace TRS_API {
//     /**交易接口基类 */
//     @Injectable()
//     export abstract class TrsApiBase<AssetJSON extends object = object> extends BASIC_API.BasicApi {
//         @Inject("bfchain-pc:api-transactionLogic")
//         protected __transactionLogic!: import("../../logic/transactionLogic").TransactionLogic;

//         protected __generateExceptionDetail = {
//             function: `${this.getName()
//                 .substring(0, 1)
//                 .toUpperCase()}${this.getName().substring(1)}.generateTransaction`,
//         };

//         constructor(apiInfo: BFChainPC.Api.ApiInfo) {
//             super(apiInfo);
//         }

//         static SUBENVPARAMSSET = new Set(["timestamp", "applyBlockHeight", "effectiveBlockHeight", "sourceIP"]);

//         getPrefix() {
//             return "/api/transaction";
//         }

//         /**
//          * 生成交易体
//          * @param request
//          * @param accountPowInfo
//          */
//         abstract generateTransaction(
//             request: BFChainPC.ApiRequest.TRANSACTION.TrCommonParam,
//             accountPowInfo: BFChainPC.AccountPowInfoModel
//         ): Promise<BFChainCore.Transaction<AssetJSON>>;

//         async __execute(request: BFChainPC.ApiRequest.TRANSACTION.TrCommonParam) {
//             const lastHeight = await this.preExecute(request);
//             const accountPowInfo = await this.getAccountPowInfo(request, lastHeight);
//             const tr = await this.generateTransaction(request, accountPowInfo);
//             const result = await this.sendTransaction(tr);
//             return result;
//         }

//         /**
//          * 执行接口前的逻辑
//          * 赋值applyBlockHeight，生成accountPowInfo
//          * @param request
//          * @param lastBlock
//          */
//         async preExecute(request: BFChainPC.ApiRequest.TRANSACTION.TrCommonParam, lastBlock?: BFChainCore.LastBlockInfo<any>): Promise<number> {
//             if (!lastBlock) {
//                 lastBlock = await this.__sharedMemoryUtil.getLastBlockAsync();
//             }
//             const inputHeight = request.applyBlockHeight;
//             const lastHeight = lastBlock.height;
//             if (inputHeight) {
//                 this.checkApplyBlockHeight(inputHeight, lastHeight);
//                 request.applyBlockHeight = inputHeight;
//             } else {
//                 request.applyBlockHeight = lastHeight;
//             }
//             return lastHeight;
//         }

//         private checkApplyBlockHeight(inputApplyBlockHeight: number, currentBlockHeight: number) {
//             if (inputApplyBlockHeight > currentBlockHeight) {
//                 throw new ArgumentIllegalException(PROP_SHOULD_LTE_FIELD, {
//                     message: { code: 342, phrase: "Transaction's applyBlockHeight must less than or equal to last block chain height" },
//                     prop: "inputApplyBlockHeight",
//                     value: inputApplyBlockHeight,
//                     field: currentBlockHeight,
//                     ...this.__checkExceptionDetail,
//                 });
//             }
//         }

//         async getAccountPowInfo(params: BFChainPC.ApiRequest.TRANSACTION.TrCommonParam, lastBlockHeight: number) {
//             let accountPowInfo: BFChainPC.AccountPowInfoModel = {
//                 round: 0,
//                 equity: "0",
//                 txCount: 0,
//             };
//             if (lastBlockHeight > this.bfchainCore.config.tpowOfWorkExemptionBlocks) {
//                 accountPowInfo = await this.__transactionLogic.__isLackOfSecondSecret(params);
//                 params.tpowDifficulty !== undefined && (accountPowInfo.txCount = params.tpowDifficulty);
//             }
//             return accountPowInfo;
//         }

//         getTransactionBody(request: BFChainPC.ApiRequest.TRANSACTION.TrCommonParam) {
//             if (request.rangeType) {
//                 if (
//                     request.rangeType !== RANGE_TYPE.EMPTY &&
//                     request.rangeType !== RANGE_TYPE.MULTI_ADDRESS &&
//                     request.rangeType !== RANGE_TYPE.MULTI_DAPPID &&
//                     request.rangeType !== RANGE_TYPE.MULTI_LOCATION_NAME
//                 ) {
//                     throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                         message: { code: 346, phrase: "{{prop}} is invalid", args: { prop: "rangeType" } },
//                         prop: "request.rangeType",
//                         value: request.rangeType,
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//             }
//             if (request.rangeType && request.rangeType !== RANGE_TYPE.EMPTY) {
//                 if (!(request.range && request.range.length > 0)) {
//                     throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                         message: { code: 345, phrase: "{{prop}} is required", args: { prop: "range" } },
//                         prop: "request.range",
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//             }
//             const remark: { [key: string]: string } = {};
//             const requestRemark = request.remark;
//             if (requestRemark) {
//                 for (const item of requestRemark) {
//                     const itemArray = item.split("_");
//                     remark[itemArray[0]] = itemArray[1];
//                 }
//             }

//             const txBody: BFChainCoreTools.MyTransactionArgv = {
//                 secret: request.secret,
//                 secondSecret: request.secondSecret,
//                 recipientId: request.recipientId,
//                 maxFee: request.maxFee || appConfig.transactionConfig.maxFee,
//                 rangeType: request.rangeType,
//                 range: request.range,
//                 remark,
//                 dappid: request.dappid,
//                 lns: request.lns,
//                 fromMagic: request.fromMagic,
//                 toMagic: request.toMagic,

//                 fee: request.fee,
//                 timestamp: this.bfchainCore.time.getTimestamp(),
//                 applyBlockHeight: request.applyBlockHeight,
//                 effectiveBlockHeight:
//                     (request.numberOfEffectiveBlocks && request.numberOfEffectiveBlocks + request.applyBlockHeight) ||
//                     request.applyBlockHeight + this.bfchainCore.config.maxApplyAndConfirmedBlockHeightDiff,
//                 sourceIP: request.sourceIP,
//             };
//             const subEnvParamList = request.subEnvParams;
//             if (subEnvParamList) {
//                 const subEnvParams: BFChainCore.SubEnvironmentParametersJSON = {};
//                 for (const subEnvParam of subEnvParamList) {
//                     if (!TrsApiBase.SUBENVPARAMSSET.has(subEnvParam)) {
//                         throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                             message: { code: 346, phrase: "{{prop}} is invalid", args: { prop: "subEnvParam" } },
//                             prop: "request.subEnvParams",
//                             value: subEnvParam,
//                             ...this.__checkExceptionDetail,
//                         });
//                     }
//                     subEnvParams[subEnvParam] = txBody[subEnvParam];
//                 }
//                 txBody.subEnvParams = subEnvParams;
//             } else {
//                 //默认值为timestamp，防止api接口调用时subId重复
//                 txBody.subEnvParams = { timestamp: txBody.timestamp };
//             }
//             return txBody;
//         }

//         getCmdCheckParam(): BFChainPC.Api.CmdApiCheckParam {
//             return {
//                 secret: "string",
//                 secondSecret: "string",
//                 subEnvParams: "string",
//                 recipientId: "string",
//                 rangeType: "integer+0",
//                 range: "string",
//                 maxFee: "integer+0",
//                 fee: "integer+0",
//                 applyBlockHeight: "integer+",
//                 remark: "string",
//                 dappid: "string",
//                 lns: "string",
//                 sourceIP: "string",
//                 fromMagic: "string",
//                 toMagic: "string",
//                 numberOfEffectiveBlocks: "integer+",
//                 tpowDifficulty: "integer+0",
//             };
//         }

//         generateRequest(request: BFChainPC.Api.CmdApiRequest): BFChainPC.ApiRequest.TRANSACTION.TrCommonParam {
//             return {
//                 secret: request.secret,
//                 secondSecret: request.secondSecret,
//                 subEnvParams: request.subEnvParams ? request.subEnvParams.split("+") : undefined,
//                 recipientId: request.recipientId,
//                 rangeType: string2Number(request.rangeType),
//                 range: request.range ? request.range.split("+") : undefined,
//                 maxFee: request.maxFee,
//                 fee: request.fee,
//                 applyBlockHeight: string2Number(request.applyBlockHeight) ?? 0,
//                 remark: request.remark ? request.remark.split("+") : undefined,
//                 dappid: request.dappid,
//                 lns: request.lns,
//                 sourceIP: request.sourceIP,
//                 fromMagic: request.fromMagic,
//                 toMagic: request.toMagic,
//                 numberOfEffectiveBlocks: string2Number(request.numberOfEffectiveBlocks),
//                 tpowDifficulty: string2Number(request.tpowDifficulty),
//             };
//         }

//         /**验证交易类型 */
//         protected _isValidtransactionSubId(transaction: BFChainCore.TransactionJSON, type: string) {
//             if (transaction.type !== type) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: {
//                         code: 123,
//                         phrase: "Invalid transaction subId, {{subId}} not a {{type}} transaction",
//                         args: { subId: transaction.subId, type },
//                     },
//                     prop: "transaction.type",
//                     value: transaction.type,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//         }

//         /**
//          * 发送交易体
//          * @param tr
//          */
//         async sendTransaction<AJ extends object = object>(
//             tr: BFChainCore.Transaction<AJ>
//         ): Promise<{ success: true; result: BFChainCore.TransactionJSON<AJ>; minFee: number } | { success: false; message: string; minFee: number }> {
//             const trJSON = tr.toJSON();
//             const result = await this.__sendTransaction(trJSON);
//             if (result.success) {
//                 return { success: true, result: trJSON, minFee: Number(result.minFee) };
//             } else {
//                 return { success: false, message: result.message, minFee: Number(result.minFee) };
//             }
//         }

//         async __sendTransaction(
//             t: BFChainCore.TransactionJSON<object>
//         ): Promise<{ success: true; minFee: string } | { success: false; message: string; minFee: string }> {
//             const tr = await this.bfchainCore.transaction.recombineTransaction(t);
//             const result = await ipcHeplers.ipcReqAsync(WORKER.PEERSCAN, CMD.NEWTRANSACTIONCOME, { tr }, true);
//             if (result) {
//                 return result;
//             } else {
//                 throw Error(`can not get ${WORKER.PEERSCAN}`);
//             }
//         }
//     }

//     /**发送转账事件 */
//     @Injectable()
//     export abstract class TrTransferAsset extends TrsApiBase<BFChainCore.TransferAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_TRANSFER_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrTransferAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myTransferAsset.generateTransferAsset(
//                 this.getTransactionBody(request),
//                 {
//                     sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
//                     sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
//                     assetType: request.assetType || this.bfchainCore.config.assetType,
//                     amount: request.amount,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送设置二次密码事件 */
//     @Injectable()
//     export abstract class TrSignature extends TrsApiBase<BFChainCore.SignatureAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_SIGNATURE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrSignature, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await mySignature.generateSignature(
//                 this.getTransactionBody(request),
//                 {
//                     publicKey: await this.bfchainCore.accountBaseHelper.getPublicKeyStringFromSecondSecret(request.secret, request.newSecondSecret),
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送设置用户名事件 */
//     @Injectable()
//     export abstract class TrUsername extends TrsApiBase<BFChainCore.UsernameAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_USER_NAME);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrUsername, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myUsername.generateUsername(
//                 this.getTransactionBody(request),
//                 {
//                     alias: request.alias,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送注册受托人事件 */
//     @Injectable()
//     export abstract class TrDelegate extends TrsApiBase<BFChainCore.DelegateAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_DELEGATE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrDelegate, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myDelegate.generateDelegate(this.getTransactionBody(request), accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送接收投票事件 */
//     @Injectable()
//     export abstract class TrAcceptVote extends TrsApiBase<BFChainCore.AcceptVoteAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_ACCEPT_VOTE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrAcceptVote, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myAcceptVote.generateAcceptVote(this.getTransactionBody(request), accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送拒绝投票事件 */
//     @Injectable()
//     export abstract class TrRejectVote extends TrsApiBase<BFChainCore.RejectVoteAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_REJECT_VOTE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrRejectVote, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myRejectVote.generateRejectVote(this.getTransactionBody(request), accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送投票事件 */
//     @Injectable()
//     export abstract class TrVote extends TrsApiBase<BFChainCore.VoteAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_VOTE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrVote, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myVote.generateVote(
//                 this.getTransactionBody(request),
//                 {
//                     equity: request.equity,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送dapp事件 */
//     @Injectable()
//     export abstract class TrDapp extends TrsApiBase<BFChainCore.DAppAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_DAPP);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrDapp, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const dappType = request.type;
//             let purchaseAsset!: BFChainCore.DAppPurchaseAssetJSON;
//             if (dappType === DAPP_TYPE.PAID_APP) {
//                 purchaseAsset = {
//                     sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
//                     sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
//                     assetType: this.bfchainCore.config.assetType,
//                     amount: request.amount,
//                 };
//             }
//             const dapp: BFChainCore.DAppJSON = {
//                 dappid: request.newDappid,
//                 sourceChainName: this.bfchainCore.config.chainName,
//                 sourceChainMagic: this.bfchainCore.config.magic,
//                 type: dappType,
//                 purchaseAsset,
//             };
//             const tr = await myDApp.generateDApp(this.getTransactionBody(request), dapp, accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送dapp购买事件 */
//     @Injectable()
//     export abstract class TrDappPurchasing extends TrsApiBase<BFChainCore.DAppPurchasingAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_DAPP_PURCHASING);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrDappPurchasing, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "DApp" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 72,
//                         phrase: "Failed to get dappid with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "dappid",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.DAppTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.DAPP);
//             const tr = await myDAppPurchasing.generateDapppurchasing(
//                 this.getTransactionBody(request),
//                 {
//                     dappAsset: transaction.asset.dapp,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送存证事件 */
//     @Injectable()
//     export abstract class TrMark extends TrsApiBase<BFChainCore.MarkAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_MARK);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrMark, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const markJson: BFChainCore.MarkJSON = {
//                 content: request.content,
//                 type: request.type,
//                 verifyCode: request.verifyCode,
//             };
//             if (request.transactionSubId) {
//                 const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                     subId: request.transactionSubId,
//                     offset: 0,
//                 });
//                 if (!(trs && trs.length > 0)) {
//                     throw new BusinessCheckException(GET_TARGET_FAIL, {
//                         message: {
//                             code: 72,
//                             phrase: "Failed to get dappid with subId {{transactionSubId}}",
//                             args: { transactionSubId: request.transactionSubId },
//                         },

//                         prop: "request.transactionSubId",
//                         value: request.transactionSubId,
//                         target: "dappid",
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//                 const transaction = trs[0].transaction as BFChainCore.DAppTransactionJSON;
//                 this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.DAPP);
//                 markJson.sourceChainName = transaction.asset.dapp.sourceChainName;
//                 markJson.sourceChainMagic = transaction.asset.dapp.sourceChainMagic;
//                 markJson.dappid = transaction.asset.dapp.dappid;
//             }
//             const txbody = this.getTransactionBody(request);
//             txbody.recipientId = request.markPossessor;
//             const tr = await myMark.generateMark(txbody, markJson, accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送资产发行事件 */
//     @Injectable()
//     export abstract class TrIssueAsset extends TrsApiBase<BFChainCore.IssueAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_ISSUE_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrIssueAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const issueAsset: BFChainCore.IssueAssetJSON = {
//                 sourceChainName: this.bfchainCore.config.chainName,
//                 sourceChainMagic: this.bfchainCore.config.magic,
//                 assetType: request.assetType,
//                 expectedIssuedAssets: request.expectedIssuedAssets,
//             };
//             const tr = await myIssueAsset.generateAsset(this.getTransactionBody(request), issueAsset, accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送销毁资产事件 */
//     @Injectable()
//     export abstract class TrDestroyAsset extends TrsApiBase<BFChainCore.DestoryAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_DESTROYASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrDestroyAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const destoryAsset: BFChainCore.DestoryAssetJSON = {
//                 sourceChainName: this.bfchainCore.config.chainName,
//                 sourceChainMagic: this.bfchainCore.config.magic,
//                 assetType: request.assetType,
//                 amount: request.amount,
//             };
//             const tr = await myDestoryAsset.generateDestoryAsset(this.getTransactionBody(request), destoryAsset, accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送数字资产交换事件 */
//     @Injectable()
//     export abstract class TrToExchangeAsset extends TrsApiBase<BFChainCore.ToExchangeAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_TO_EXCHANGE_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrToExchangeAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myToExchangeAsset.generateToExchangeAsset(
//                 this.getTransactionBody(request),
//                 {
//                     cipherPublicKeys: [],
//                     toExchangeSource: request.toExchangeSource,
//                     beExchangeSource: request.beExchangeSource,
//                     toExchangeChainName: request.toExchangeChainName,
//                     beExchangeChainName: request.beExchangeChainName,
//                     toExchangeAsset: request.toExchangeAsset,
//                     beExchangeAsset: request.beExchangeAsset,
//                     toExchangeNumber: request.toExchangeNumber,
//                     exchangeRatio: {
//                         toExchangeAsset: request.prevWeight,
//                         beExchangeAsset: request.nextWeight,
//                     },
//                 },
//                 request.ciphertexts,
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送接收数字资产交换事件 */
//     @Injectable()
//     export abstract class TrBeExchangeAsset extends TrsApiBase<BFChainCore.BeExchangeAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_BE_EXCHANGE_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrBeExchangeAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "ToExchangeAsset" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 76,
//                         phrase: "Failed to get toExchangeAsset with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "toExchangeAsset",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.ToExchangeAssetTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.TO_EXCHANGE_ASSET);
//             const ciphertext: string | undefined = request.ciphertext;
//             if (transaction.asset.toExchangeAsset.cipherPublicKeys.length > 0) {
//                 if (!ciphertext) {
//                     throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                         message: { code: 37, phrase: "Ciphertext is required" },
//                         prop: "request.ciphertext",
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//             }
//             const tr = await myBeExchangeAsset.generateBeExchangeAsset(
//                 this.getTransactionBody(request),
//                 {
//                     transactionSubId: request.transactionSubId,
//                     beExchangeNumber: request.beExchangeNumber,
//                     toExchangeNumber: request.toExchangeNumber,
//                     exchangeAsset: transaction.asset.toExchangeAsset,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore,
//                 ciphertext
//             );
//             return tr;
//         }
//     }

//     /**发送特殊资产交换事件 */
//     @Injectable()
//     export abstract class TrToExchangeSpecAsset extends TrsApiBase<BFChainCore.ToExchangeSpecialAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_TO_EXCHANGE_SPEC_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrToExchangeSpecAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myToExchangeSpecialAsset.generateToExchangeSpecialAsset(
//                 this.getTransactionBody(request),
//                 {
//                     cipherPublicKeys: [],
//                     toExchangeSource: request.toExchangeSource,
//                     beExchangeSource: request.beExchangeSource,
//                     toExchangeChainName: request.toExchangeChainName,
//                     beExchangeChainName: request.beExchangeChainName,
//                     toExchangeAsset: request.toExchangeAsset,
//                     beExchangeAsset: request.beExchangeAsset,
//                     exchangeNumber: request.exchangeNumber,
//                     exchangeAssetType: request.exchangeAssetType,
//                     exchangeDirection: request.exchangeDirection,
//                 },
//                 request.ciphertexts,
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送接收特殊资产交换事件 */
//     @Injectable()
//     export abstract class TrBeExchangeSpecAsset extends TrsApiBase<BFChainCore.BeExchangeSpecialAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_BE_EXCHANGE_SPEC_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrBeExchangeSpecAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "ToExchangeSpecialAsset" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 77,
//                         phrase: "Failed to get toExchangeSpecialAsset with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "toExchangeSpecialAsset",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.ToExchangeSpecialAssetTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.TO_EXCHANGE_SPECIAL_ASSET);
//             const ciphertext: string | undefined = request.ciphertext;
//             if (transaction.asset.toExchangeSpecialAsset.cipherPublicKeys.length > 0) {
//                 if (!ciphertext) {
//                     throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                         message: { code: 37, phrase: "Ciphertext is required" },
//                         prop: "request.ciphertext",
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//             }
//             const tr = await myBeExchangeSpecialAsset.generateBeExchangeSpecialAsset(
//                 this.getTransactionBody(request),
//                 {
//                     transactionSubId: request.transactionSubId,
//                     exchangeSpecialAsset: transaction.asset.toExchangeSpecialAsset,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore,
//                 ciphertext
//             );
//             return tr;
//         }
//     }

//     /**发送资产赠与事件（红包事件） */
//     @Injectable()
//     export abstract class TrGiftAsset extends TrsApiBase<BFChainCore.GiftAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_GIFT_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrGiftAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (request.recipientId) {
//                 throw new ArgumentIllegalException(SHOULD_NOT_EXIST, {
//                     message: { code: 340, phrase: "{{prop}} should not exist", args: { prop: "recipientId" } },
//                     prop: "request.recipientId",
//                     value: request.recipientId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const tr = await myGiftAsset.generateGiftAsset(
//                 this.getTransactionBody(request),
//                 {
//                     cipherPublicKeys: [],
//                     sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
//                     sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
//                     assetType: request.assetType || this.bfchainCore.config.assetType,
//                     amount: request.amount,
//                     totalGrabableTimes: request.totalGrabableTimes,
//                     giftDistributionRule: request.giftDistributionRule,
//                     beginUnfrozenBlockHeight:
//                         (request.numberOfBeginUnfrozenBlocks && request.numberOfBeginUnfrozenBlocks + request.applyBlockHeight) || request.applyBlockHeight,
//                 },
//                 request.ciphertexts,
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送接收资产赠与事件（抢红包事件） */
//     @Injectable()
//     export abstract class TrGrabAsset extends TrsApiBase<BFChainCore.GrabAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_GRAB_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrGrabAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "GiftAsset" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 74,
//                         phrase: "Failed to get giftAsset with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "giftAsset",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             if (request.recipientId) {
//                 throw new ArgumentIllegalException(SHOULD_NOT_EXIST, {
//                     message: { code: 340, phrase: "{{prop}} should not exist", args: { prop: "recipientId" } },
//                     prop: "request.recipientId",
//                     value: request.recipientId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.GiftAssetTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.GIFT_ASSET);
//             const ciphertext: string | undefined = request.ciphertext;
//             if (transaction.asset.giftAsset.cipherPublicKeys.length > 0) {
//                 if (!ciphertext) {
//                     throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                         message: { code: 37, phrase: "Ciphertext is required" },
//                         prop: "request.ciphertext",
//                         ...this.__generateExceptionDetail,
//                     });
//                 }
//             }
//             const txbody = this.getTransactionBody(request);
//             txbody.recipientId = transaction.senderId;
//             const tr = await myGrabAsset.generateGrabAsset(
//                 txbody,
//                 {
//                     blockId: request.blockId,
//                     transactionSubId: request.transactionSubId,
//                     amount: request.amount,
//                     giftAsset: transaction.asset.giftAsset,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore,
//                 ciphertext
//             );
//             return tr;
//         }
//     }

//     /**发送委托数字资产事件 */
//     @Injectable()
//     export abstract class TrTrustAsset extends TrsApiBase<BFChainCore.TrustAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_TRUST_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrTrustAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myTrustAsset.generateTrustAsset(
//                 this.getTransactionBody(request),
//                 {
//                     trustees: request.trustees,
//                     numberOfSignFor: request.numberOfSignFor,
//                     sourceChainName: request.sourceChainName || this.bfchainCore.config.chainName,
//                     sourceChainMagic: request.sourceChainMagic || this.bfchainCore.config.magic,
//                     assetType: request.assetType || this.bfchainCore.config.assetType,
//                     amount: request.amount,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送签收委托数字资产事件 */
//     @Injectable()
//     export abstract class TrSignForAsset extends TrsApiBase<BFChainCore.SignForAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_SIGN_FOR_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrSignForAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "TrustAsset" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 78,
//                         phrase: "Failed to get trustAsset with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "trustAsset",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.TrustAssetTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.TRUST_ASSET);
//             const txbody = this.getTransactionBody(request);
//             txbody.recipientId = transaction.recipientId;
//             const tr = await mySignForAsset.generateSignForAsset(
//                 txbody,
//                 {
//                     transactionSubId: request.transactionSubId,
//                     trustSenderId: transaction.senderId,
//                     trustRecipientId: transaction.recipientId as string,
//                     trustAsset: transaction.asset.trustAsset,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送资产迁出交易 */
//     @Injectable()
//     export abstract class TrEmigrateAsset extends TrsApiBase<BFChainCore.EmigrateAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_EMIGRATE_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrEmigrateAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const genesisDelegateSignature = {
//                 publicKey: request.genesisDelegateSignature[0],
//                 signature: request.genesisDelegateSignature[1],
//             };
//             const tr = await myEmigrateAsset.generateEmigrateAsset(
//                 this.getTransactionBody(request),
//                 {
//                     genesisDelegateSignature,
//                     sourceChainName: this.bfchainCore.config.chainName,
//                     sourceChainMagic: this.bfchainCore.config.magic,
//                     assetType: this.bfchainCore.config.assetType,
//                     amount: request.amount,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             const trJson = tr.toJSON();
//             trJson.recipientId;
//             return tr;
//         }
//     }

//     /**发送资产迁入交易 */
//     @Injectable()
//     export abstract class TrImmigrateAsset extends TrsApiBase<BFChainCore.ImmigrateAssetAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_IMMIGRATE_ASSET);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrImmigrateAsset, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             if (!this.bfchainCore.baseHelper.isValidTransactionSubId(request.transactionSubId)) {
//                 throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                     message: { code: 348, phrase: "{{transaction}} transaction subId is invalid", args: { transaction: "EmigrateAsset" } },
//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const trs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 subId: request.transactionSubId,
//                 offset: 0,
//             });
//             if (!(trs && trs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: {
//                         code: 73,
//                         phrase: "Failed to get emigrateAsset with subId {{transactionSubId}}",
//                         args: { transactionSubId: request.transactionSubId },
//                     },

//                     prop: "request.transactionSubId",
//                     value: request.transactionSubId,
//                     target: "emigrateAsset",
//                     ...this.__generateExceptionDetail,
//                 });
//             }
//             const transaction = trs[0].transaction as BFChainCore.EmigrateAssetTransactionJSON;
//             this._isValidtransactionSubId(transaction, this.bfchainCore.transactionHelper.EMIGRATE_ASSET);
//             const genesisDelegateSignature = {
//                 publicKey: request.genesisDelegateSignature[0],
//                 signature: request.genesisDelegateSignature[1],
//             };

//             const subtrs = await this.__transactionMongoHelper.getTransactionByQueryOptions({
//                 type: this.bfchainCore.transactionHelper.REGISTER_CHAIN,
//                 storage: {
//                     key: "magic",
//                     value: transaction.toMagic,
//                 },
//                 offset: 0,
//             });

//             if (!(subtrs && subtrs.length > 0)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: { code: 75, phrase: "Failed to get registerChain transaction with magic {{magic}}", args: { magic: transaction.toMagic } },
//                     prop: "transaction.toMagic",
//                     value: transaction.toMagic,
//                     target: "registerChain transaction",
//                     ...this.__generateExceptionDetail,
//                 });
//             }

//             const registerChainTransansaction = subtrs[0].transaction as BFChainCore.RegisterChainTransactionJSON;
//             const registerChainhainGenesisBlock = registerChainTransansaction.asset.registerChain.genesisBlock;

//             const registerChainCore = BFChainCoreFactory({
//                 config: new ConfigHelper(registerChainhainGenesisBlock, "genesisBlock"),
//                 Buffer: this.bfchainCore.moduleMap.get("Buffer"),
//                 cryptoHelper: this.bfchainCore.moduleMap.get("cryptoHelper"),
//                 keypairHelper: this.bfchainCore.moduleMap.get("keypairHelper"),
//                 ed2curveHelper: this.bfchainCore.moduleMap.get("ed2curveHelper"),
//             });

//             registerChainCore.configMap.set(this.bfchainCore.config.magic, this.bfchainCore.config);

//             const tr = await myImmigrateAsset.generateImmigrateAsset(
//                 this.getTransactionBody(request),
//                 {
//                     genesisDelegateSignature,
//                     emigrateAssetTransaction: transaction,
//                 },
//                 accountPowInfo,
//                 registerChainCore
//             );
//             return tr;
//         }
//     }

//     /**发送注册、注销位名系统事件 */
//     @Injectable()
//     export abstract class TrLocationName extends TrsApiBase<BFChainCore.LocationNameAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_LOCATION_NAME);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrLocationName, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await myLocationName.generateLocationName(
//                 this.getTransactionBody(request),
//                 {
//                     name: request.name,
//                     sourceChainName: this.bfchainCore.config.chainName,
//                     sourceChainMagic: this.bfchainCore.config.magic,
//                     operationType: request.operationType,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送设置位名系统管理员事件 */
//     @Injectable()
//     export abstract class TrSetLnsManager extends TrsApiBase<BFChainCore.SetLnsManagerAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_SET_LNS_MANAGER);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrSetLnsManager, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const tr = await mySetLnsManager.generateSetLnsManager(
//                 this.getTransactionBody(request),
//                 {
//                     name: request.name,
//                     sourceChainName: this.bfchainCore.config.chainName,
//                     sourceChainMagic: this.bfchainCore.config.magic,
//                 },
//                 accountPowInfo,
//                 this.bfchainCore
//             );
//             return tr;
//         }
//     }

//     /**发送设置位名系统解析值事件 */
//     @Injectable()
//     export abstract class TrSetLnsRecordValue extends TrsApiBase<BFChainCore.SetLnsRecordValueAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_SET_LNS_RECORD_VALUE);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrSetLnsRecordValue, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const operationType = request.operationType;
//             const asset: BFChainCore.SetLnsRecordValueJSON = {
//                 name: request.name,
//                 sourceChainName: this.bfchainCore.config.chainName,
//                 sourceChainMagic: this.bfchainCore.config.magic,
//                 operationType,
//                 addRecord: undefined,
//                 deleteRecord: undefined,
//             };
//             switch (operationType) {
//                 case RECORD_OPERATION_TYPE.ADD: {
//                     if (request.addRecord === undefined) {
//                         throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                             message: { code: 6, phrase: "AddRecord is required" },
//                             prop: "request.addRecord",
//                             ...this.__generateExceptionDetail,
//                         });
//                     }
//                     asset.addRecord = {
//                         recordType: request.addRecord[0] as RECORD_TYPE,
//                         recordValue: request.addRecord[1],
//                     };
//                     break;
//                 }
//                 case RECORD_OPERATION_TYPE.DELETE: {
//                     if (request.deleteRecord === undefined) {
//                         throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                             message: { code: 55, phrase: "DeleteRecord is required" },
//                             prop: "request.deleteRecord",
//                             ...this.__generateExceptionDetail,
//                         });
//                     }
//                     asset.deleteRecord = {
//                         recordType: request.deleteRecord[0] as RECORD_TYPE,
//                         recordValue: request.deleteRecord[1],
//                     };
//                     break;
//                 }
//                 case RECORD_OPERATION_TYPE.UPDATE: {
//                     if (request.addRecord === undefined) {
//                         throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                             message: { code: 6, phrase: "AddRecord is required" },
//                             prop: "request.addRecord",
//                             ...this.__generateExceptionDetail,
//                         });
//                     }
//                     if (request.deleteRecord === undefined) {
//                         throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                             message: { code: 55, phrase: "DeleteRecord is required" },
//                             prop: "request.deleteRecord",
//                             ...this.__generateExceptionDetail,
//                         });
//                     }
//                     asset.addRecord = {
//                         recordType: request.addRecord[0] as RECORD_TYPE,
//                         recordValue: request.addRecord[1],
//                     };
//                     asset.deleteRecord = {
//                         recordType: request.deleteRecord[0] as RECORD_TYPE,
//                         recordValue: request.deleteRecord[1],
//                     };
//                     break;
//                 }
//                 default:
//                     throw new ArgumentIllegalException(PROP_IS_INVALID, {
//                         message: { code: 121, phrase: "Invalid location name record operationType" },
//                         prop: "request.operationType",
//                         value: request.operationType,
//                         ...this.__generateExceptionDetail,
//                     });
//             }
//             const tr = await mySetLnsRecordValue.generateSetLnsRecordValue(this.getTransactionBody(request), asset, accountPowInfo, this.bfchainCore);
//             return tr;
//         }
//     }

//     /**发送注册链事件 */
//     @Injectable()
//     export abstract class TrRegisterChain extends TrsApiBase<BFChainCore.RegisterChainAssetJSON> {
//         constructor() {
//             super(API.TRANSACTION.TR_REGISTER_CHAIN);
//         }

//         async generateTransaction(request: BFChainPC.ApiRequest.TRANSACTION.TrRegisterChain, accountPowInfo: BFChainPC.AccountPowInfoModel) {
//             const genesisBlockPath = request.genesisBlockPath;
//             if (!genesisBlockPath) {
//                 throw new ArgumentIllegalException(PROP_IS_REQUIRE, {
//                     message: { code: 322, phrase: "GenesisBlockPath is required" },
//                     prop: "request.genesisBlockPath",
//                     ...this.__generateExceptionDetail,
//                 });
//             }

//             const realPath = process.cwd() + "/" + genesisBlockPath;

//             if (!fs.existsSync(realPath)) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: { code: 323, phrase: "GenensisBlock not exists" },
//                     prop: "realPath",
//                     value: realPath,
//                     target: "GenensisBlock",
//                     ...this.__generateExceptionDetail,
//                 });
//             }

//             const genesisBlockData = fs.readFileSync(realPath);

//             if (!genesisBlockData) {
//                 throw new BusinessCheckException(GET_TARGET_FAIL, {
//                     message: { code: 323, phrase: "GenensisBlock not exists" },
//                     prop: "realPath",
//                     value: realPath,
//                     target: "GenensisBlock",
//                     ...this.__generateExceptionDetail,
//                 });
//             }

//             const genesisBlock: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> = JSON.parse(genesisBlockData.toString());

//             const tr = await myRegisterChain.generateRegisterChain(this.getTransactionBody(request), accountPowInfo, genesisBlock, this.bfchainCore);
//             return tr;
//         }
//     }
// }
