import {
    UsernameApi,
    SignatureApi,
    DelegateApi,
    AcceptVoteApi,
    RejectVoteApi,
    VoteApi,
    IssueAssetApi,
    TransferAssetApi,
    DestoryAssetApi,
    GiftAssetApi,
    GrabAssetApi,
    TrustAssetApi,
    SignForAssetApi,
    ToExchangeAssetApi,
    BeExchangeAssetApi,
    DAppApi,
    DAppPurchasingApi,
    MarkApi,
    LocationNameApi,
    SetLnsManagerApi,
    SetLnsRecordValueApi,
    ToExchangeSpecialAssetApi,
    BeExchangeSpecialAssetApi,
    RegisterChainApi,
    EmigrateAssetApi,
    ImmigrateAssetApi,
    GenerateMigrateCertificateApi,
    FromAuthSignatureMigrateCertificateApi,
    ToAuthSignatureMigrateCertificateApi,
} from "./apis";
import { GENERATE_TRANSACTION_API_PATH, MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class TransactionApi {
    private __TRANSACTION_API_MAP = new Map<BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH, BFChainPcSdk.Transaction.TransactionApi>();
    private __MIGRATE_CERTIFICATE_API_MAP = new Map<BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH, BFChainPcSdk.CrossChain.MigrateCertificateApi>();

    constructor(private __networkHelper: BFChainPcSdk.NetworkHelper) {
        this.__init();
    }

    private __init() {
        const { __networkHelper: networkHelper, __TRANSACTION_API_MAP: TRANSACTION_API_MAP, __MIGRATE_CERTIFICATE_API_MAP: MIGRATE_CERTIFICATE_API_MAP } = this;

        const usernameApi = new UsernameApi(networkHelper);
        const signatureApi = new SignatureApi(networkHelper);
        const delegateApi = new DelegateApi(networkHelper);
        const acceptVoteApi = new AcceptVoteApi(networkHelper);
        const rejectVoteApi = new RejectVoteApi(networkHelper);
        const voteApi = new VoteApi(networkHelper);
        const issueAssetApi = new IssueAssetApi(networkHelper);
        const transferAssetApi = new TransferAssetApi(networkHelper);
        const destoryAssetApi = new DestoryAssetApi(networkHelper);
        const giftAssetApi = new GiftAssetApi(networkHelper);
        const grabAssetApi = new GrabAssetApi(networkHelper);
        const trustAssetApi = new TrustAssetApi(networkHelper);
        const signForAssetApi = new SignForAssetApi(networkHelper);
        const toExchangeAssetApi = new ToExchangeAssetApi(networkHelper);
        const beExchangeAssetApi = new BeExchangeAssetApi(networkHelper);
        const dAppApi = new DAppApi(networkHelper);
        const dAppPurchasingApi = new DAppPurchasingApi(networkHelper);
        const markApi = new MarkApi(networkHelper);
        const locationNameApi = new LocationNameApi(networkHelper);
        const setLnsManagerApi = new SetLnsManagerApi(networkHelper);
        const setLnsRecordValueApi = new SetLnsRecordValueApi(networkHelper);
        const toExchangeSpecialAssetApi = new ToExchangeSpecialAssetApi(networkHelper);
        const beExchangeSpecialAssetApi = new BeExchangeSpecialAssetApi(networkHelper);
        const registerChainApi = new RegisterChainApi(networkHelper);
        const emigrateAssetApi = new EmigrateAssetApi(networkHelper);
        const immigrateAssetApi = new ImmigrateAssetApi(networkHelper);

        TRANSACTION_API_MAP.set(usernameApi.GENERATE_API_PATH, usernameApi);
        TRANSACTION_API_MAP.set(signatureApi.GENERATE_API_PATH, signatureApi);
        TRANSACTION_API_MAP.set(delegateApi.GENERATE_API_PATH, delegateApi);
        TRANSACTION_API_MAP.set(acceptVoteApi.GENERATE_API_PATH, acceptVoteApi);
        TRANSACTION_API_MAP.set(rejectVoteApi.GENERATE_API_PATH, rejectVoteApi);
        TRANSACTION_API_MAP.set(voteApi.GENERATE_API_PATH, voteApi);
        TRANSACTION_API_MAP.set(issueAssetApi.GENERATE_API_PATH, issueAssetApi);
        TRANSACTION_API_MAP.set(transferAssetApi.GENERATE_API_PATH, transferAssetApi);
        TRANSACTION_API_MAP.set(destoryAssetApi.GENERATE_API_PATH, destoryAssetApi);
        TRANSACTION_API_MAP.set(giftAssetApi.GENERATE_API_PATH, giftAssetApi);
        TRANSACTION_API_MAP.set(grabAssetApi.GENERATE_API_PATH, grabAssetApi);
        TRANSACTION_API_MAP.set(trustAssetApi.GENERATE_API_PATH, trustAssetApi);
        TRANSACTION_API_MAP.set(signForAssetApi.GENERATE_API_PATH, signForAssetApi);
        TRANSACTION_API_MAP.set(toExchangeAssetApi.GENERATE_API_PATH, toExchangeAssetApi);
        TRANSACTION_API_MAP.set(beExchangeAssetApi.GENERATE_API_PATH, beExchangeAssetApi);
        TRANSACTION_API_MAP.set(dAppApi.GENERATE_API_PATH, dAppApi);
        TRANSACTION_API_MAP.set(dAppPurchasingApi.GENERATE_API_PATH, dAppPurchasingApi);
        TRANSACTION_API_MAP.set(markApi.GENERATE_API_PATH, markApi);
        TRANSACTION_API_MAP.set(locationNameApi.GENERATE_API_PATH, locationNameApi);
        TRANSACTION_API_MAP.set(setLnsManagerApi.GENERATE_API_PATH, setLnsManagerApi);
        TRANSACTION_API_MAP.set(setLnsRecordValueApi.GENERATE_API_PATH, setLnsRecordValueApi);
        TRANSACTION_API_MAP.set(toExchangeSpecialAssetApi.GENERATE_API_PATH, toExchangeSpecialAssetApi);
        TRANSACTION_API_MAP.set(beExchangeSpecialAssetApi.GENERATE_API_PATH, beExchangeSpecialAssetApi);
        TRANSACTION_API_MAP.set(registerChainApi.GENERATE_API_PATH, registerChainApi);
        TRANSACTION_API_MAP.set(emigrateAssetApi.GENERATE_API_PATH, emigrateAssetApi);
        TRANSACTION_API_MAP.set(immigrateAssetApi.GENERATE_API_PATH, immigrateAssetApi);

        const generateMigrateCertificateApi = new GenerateMigrateCertificateApi(networkHelper);
        const fromAuthSignatureMigrateCertificateApi = new FromAuthSignatureMigrateCertificateApi(networkHelper);
        const toAuthSignatureMigrateCertificateApi = new ToAuthSignatureMigrateCertificateApi(networkHelper);

        MIGRATE_CERTIFICATE_API_MAP.set(generateMigrateCertificateApi.GENERATE_API_PATH, generateMigrateCertificateApi);
        MIGRATE_CERTIFICATE_API_MAP.set(fromAuthSignatureMigrateCertificateApi.GENERATE_API_PATH, fromAuthSignatureMigrateCertificateApi);
        MIGRATE_CERTIFICATE_API_MAP.set(toAuthSignatureMigrateCertificateApi.GENERATE_API_PATH, toAuthSignatureMigrateCertificateApi);

        Object.freeze(TRANSACTION_API_MAP);
    }

    private __getTransactionApi<T extends BFChainPcSdk.Transaction.TransactionApi>(apiPath: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH) {
        return this.__TRANSACTION_API_MAP.get(apiPath) as T;
    }

    private __getMigrateCertificateApi<T extends BFChainPcSdk.CrossChain.MigrateCertificateApi>(apiPath: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH) {
        return this.__MIGRATE_CERTIFICATE_API_MAP.get(apiPath) as T;
    }

    /**创建设置用户名事件 */
    async generateUsername(argv: BFChainPcSdk.Transaction.UsernameTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置用户名事件 */
    async broadcastUsername(transaction: BFChainCore.UsernameTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置用户名事件 */
    async sendUsername(argv: BFChainPcSdk.Transaction.UsernameTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置安全密码事件 */
    async generateSignature(argv: BFChainPcSdk.Transaction.SignatureTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置安全密码事件 */
    async broadcastSignature(transaction: BFChainCore.SignatureTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置安全密码事件 */
    async sendSignature(argv: BFChainPcSdk.Transaction.SignatureTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册受托人事件 */
    async generateDelegate(argv: BFChainPcSdk.Transaction.DelegateTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册受托人事件 */
    async broadcastDelegate(transaction: BFChainCore.DelegateTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册受托人事件 */
    async sendDelegate(argv: BFChainPcSdk.Transaction.DelegateTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建开启收票事件 */
    async generateAcceptVote(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送开启收票事件 */
    async broadcastAcceptVote(transaction: BFChainCore.AcceptVoteTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送开启收票事件 */
    async sendAcceptVote(argv: BFChainPcSdk.Transaction.AcceptVoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建关闭收票事件 */
    async generateRejectVote(argv: BFChainPcSdk.Transaction.RejectVoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送关闭收票事件 */
    async broadcastRejectVote(transaction: BFChainCore.RejectVoteTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送关闭收票事件 */
    async sendRejectVote(argv: BFChainPcSdk.Transaction.RejectVoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建治理投票事件 */
    async generateVote(argv: BFChainPcSdk.Transaction.VoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送治理投票事件 */
    async broadcastVote(transaction: BFChainCore.VoteTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送治理投票事件 */
    async sendVote(argv: BFChainPcSdk.Transaction.VoteTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益发行事件 */
    async generateIssueAsset(argv: BFChainPcSdk.Transaction.IssueAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益发行事件 */
    async broadcastIssueAsset(transaction: BFChainCore.IssueAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益发行事件 */
    async sendIssueAsset(argv: BFChainPcSdk.Transaction.IssueAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益转移事件 */
    async generateTransferAsset(argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益转移事件 */
    async broadcastTransferAsset(transaction: BFChainCore.TransferAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益转移事件 */
    async sendTransferAsset(argv: BFChainPcSdk.Transaction.TransferAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益销毁事件 */
    async generateDestoryAsset(argv: BFChainPcSdk.Transaction.DestoryAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益销毁事件 */
    async broadcastDestoryAsset(transaction: BFChainCore.DestoryAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益销毁事件 */
    async sendDestoryAsset(argv: BFChainPcSdk.Transaction.DestoryAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益赠送事件 */
    async generateGiftAsset(argv: BFChainPcSdk.Transaction.GiftAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益赠送事件 */
    async broadcastGiftAsset(transaction: BFChainCore.GiftAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益赠送事件 */
    async sendGiftAsset(argv: BFChainPcSdk.Transaction.GiftAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受权益赠送事件 */
    async generateGrabAsset(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受权益赠送事件 */
    async broadcastGrabAsset(transaction: BFChainCore.GrabAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受权益赠送事件 */
    async sendGrabAsset(argv: BFChainPcSdk.Transaction.GrabAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益委托事件 */
    async generateTrustAsset(argv: BFChainPcSdk.Transaction.TrustAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益委托事件 */
    async broadcastTrustAsset(transaction: BFChainCore.TrustAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益委托事件 */
    async sendTrustAsset(argv: BFChainPcSdk.Transaction.TrustAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建签收权益委托事件 */
    async generateSignForAsset(argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送签收权益委托事件 */
    async broadcastSignForAsset(transaction: BFChainCore.SignForAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送签收权益委托事件 */
    async sendSignForAsset(argv: BFChainPcSdk.Transaction.SignForAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益交换事件 */
    async generateToExchangeAsset(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益交换事件 */
    async broadcastToExchangeAsset(transaction: BFChainCore.ToExchangeAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益交换事件 */
    async sendToExchangeAsset(argv: BFChainPcSdk.Transaction.ToExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受权益交换事件 */
    async generateBeExchangeAsset(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受权益交换事件 */
    async broadcastBeExchangeAsset(transaction: BFChainCore.BeExchangeAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受权益交换事件 */
    async sendBeExchangeAsset(argv: BFChainPcSdk.Transaction.BeExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建 dapp 发行事件 */
    async generateDApp(argv: BFChainPcSdk.Transaction.DAppTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送 dapp 发行事件 */
    async broadcastDApp(transaction: BFChainCore.DAppTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送 dapp 发行事件 */
    async sendDApp(argv: BFChainPcSdk.Transaction.DAppTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建 dapp 购买事件 */
    async generateDAppPurchasing(argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送 dapp 购买事件 */
    async broadcastDAppPurchasing(transaction: BFChainCore.DAppPurchasingTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送 dapp 购买事件 */
    async sendDAppPurchasing(argv: BFChainPcSdk.Transaction.DAppPurchasingTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建存证事件 */
    async generateMark(argv: BFChainPcSdk.Transaction.MarkTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送存证事件 */
    async broadcastMark(transaction: BFChainCore.MarkTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送存证事件 */
    async sendMark(argv: BFChainPcSdk.Transaction.MarkTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册/注销链域名事件 */
    async generateLocationName(argv: BFChainPcSdk.Transaction.LocationNameTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册/注销链域名事件 */
    async broadcastLocationName(transaction: BFChainCore.LocationNameTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册/注销链域名事件 */
    async sendLocationName(argv: BFChainPcSdk.Transaction.LocationNameTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置链域名管理员事件 */
    async generateSetLnsManager(argv: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置链域名管理员事件 */
    async broadcastSetLnsManager(transaction: BFChainCore.SetLnsManagerTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置链域名管理员事件 */
    async sendSetLnsManager(argv: BFChainPcSdk.Transaction.SetLnsManagerTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置链域名解析值事件 */
    async generateSetLnsRecordValue(argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置链域名解析值事件 */
    async broadcastSetLnsRecordValue(transaction: BFChainCore.SetLnsRecordValueTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置链域名解析值事件 */
    async sendSetLnsRecordValue(argv: BFChainPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建资产交换事件 */
    async generateToExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送资产交换事件 */
    async broadcastToExchangeSpecialAsset(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送资产交换事件 */
    async sendToExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受资产交换事件 */
    async generateBeExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受资产交换事件 */
    async broadcastBeExchangeSpecialAsset(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受资产交换事件 */
    async sendBeExchangeSpecialAsset(argv: BFChainPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册链事件 */
    async generateRegisterChain(argv: BFChainPcSdk.Transaction.RegisterChainTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册链事件 */
    async broadcastRegisterChain(transaction: BFChainCore.RegisterChainTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册链事件 */
    async sendRegisterChain(argv: BFChainPcSdk.Transaction.RegisterChainTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益迁出事件 */
    async generateEmigrateAsset(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益迁出事件 */
    async broadcastEmigrateAsset(transaction: BFChainCore.EmigrateAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益迁出事件 */
    async sendEmigrateAsset(argv: BFChainPcSdk.Transaction.EmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益迁入事件 */
    async generateImmigrateAsset(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益迁入事件 */
    async broadcastImmigrateAsset(transaction: BFChainCore.ImmigrateAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益迁入事件 */
    async sendImmigrateAsset(argv: BFChainPcSdk.Transaction.ImmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFChainPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益迁移凭证 */
    async generateMigrateCertificate(argv: BFChainCore.CrossChain.GenerateMigrateCertificateArgs) {
        const api = this.__getMigrateCertificateApi<BFChainPcSdk.CrossChain.GenerateMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
    /**创建权益迁移凭证的迁出授权签名 */
    async fromAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const api = this.__getMigrateCertificateApi<BFChainPcSdk.CrossChain.FromAuthSignatureMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
    /**创建权益迁移凭证的迁入授权签名 */
    async toAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const api = this.__getMigrateCertificateApi<BFChainPcSdk.CrossChain.ToAuthSignatureMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_TO_AUTH_SIGNATURE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
}
