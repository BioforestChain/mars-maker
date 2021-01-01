// import { Injectable, Inject } from "@bfchain/util";
// import { PcSDKExceptionGenerator } from "../helpers/moduleError/expceptionGenerator";
// import { ApiBase } from "./apiBase";
// import { API } from "./apiConst";
// const { ArgumentIllegalException, BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:api", __filename);

// export namespace TRS_API {
//     /**交易接口基类 */
//     @Injectable()
//     abstract class TrsApi extends ApiBase {
//         constructor(apiInfo: BFChainPcSdk.ApiInfo) {
//             super(apiInfo);
//         }

//         getPrefix() {
//             return "/api/transaction";
//         }
//     }

//     /**发送转账事件 */
//     @Injectable()
//     export class TrTransferAsset extends TrsApi {
//         constructor() {
//             super(API.TRANSACTION.TR_TRANSFER_ASSET);
//         }
//     }

//     /**发送设置二次密码事件 */
//     @Injectable()
//     export class TrSignature extends TrsApi {
//         constructor() {
//             super(API.TRANSACTION.TR_SIGNATURE);
//         }
//     }

//     /**发送设置用户名事件 */
//     @Injectable()
//     export class TrUsername extends TrsApi<BFChainCore.UsernameAssetJSON> {
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
//     export class TrDelegate extends TrsApi<BFChainCore.DelegateAssetJSON> {
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
//     export class TrAcceptVote extends TrsApi<BFChainCore.AcceptVoteAssetJSON> {
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
//     export class TrRejectVote extends TrsApi<BFChainCore.RejectVoteAssetJSON> {
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
//     export class TrVote extends TrsApi<BFChainCore.VoteAssetJSON> {
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
//     export class TrDapp extends TrsApi<BFChainCore.DAppAssetJSON> {
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
//     export class TrDappPurchasing extends TrsApi<BFChainCore.DAppPurchasingAssetJSON> {
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
//     export class TrMark extends TrsApi<BFChainCore.MarkAssetJSON> {
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
//     export class TrIssueAsset extends TrsApi<BFChainCore.IssueAssetAssetJSON> {
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
//     export class TrDestroyAsset extends TrsApi<BFChainCore.DestoryAssetAssetJSON> {
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
//     export class TrToExchangeAsset extends TrsApi<BFChainCore.ToExchangeAssetAssetJSON> {
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
//     export class TrBeExchangeAsset extends TrsApi<BFChainCore.BeExchangeAssetAssetJSON> {
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
//     export class TrToExchangeSpecAsset extends TrsApi<BFChainCore.ToExchangeSpecialAssetAssetJSON> {
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
//     export class TrBeExchangeSpecAsset extends TrsApi<BFChainCore.BeExchangeSpecialAssetAssetJSON> {
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
//     export class TrGiftAsset extends TrsApi<BFChainCore.GiftAssetAssetJSON> {
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
//     export class TrGrabAsset extends TrsApi<BFChainCore.GrabAssetAssetJSON> {
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
//     export class TrTrustAsset extends TrsApi<BFChainCore.TrustAssetAssetJSON> {
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
//     export class TrSignForAsset extends TrsApi<BFChainCore.SignForAssetAssetJSON> {
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
//     export class TrEmigrateAsset extends TrsApi<BFChainCore.EmigrateAssetAssetJSON> {
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
//     export class TrImmigrateAsset extends TrsApi<BFChainCore.ImmigrateAssetAssetJSON> {
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
//     export class TrLocationName extends TrsApi<BFChainCore.LocationNameAssetJSON> {
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
//     export class TrSetLnsManager extends TrsApi<BFChainCore.SetLnsManagerAssetJSON> {
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
//     export class TrSetLnsRecordValue extends TrsApi<BFChainCore.SetLnsRecordValueAssetJSON> {
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
//     export class TrRegisterChain extends TrsApi<BFChainCore.RegisterChainAssetJSON> {
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
