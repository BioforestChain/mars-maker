import {
    CommonTransactionApi,
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
    IssueEntityFactoryApi,
    IssueEntityFactoryV1Api,
    IssueEntityApi,
    DestoryEntityApi,
    TransferAnyApi,
    GiftAnyApi,
    GrabAnyApi,
    ToExchangeAnyApi,
    BeExchangeAnyApi,
    IssueEntityMultiApi,
    ToExchangeAnyMultiApi,
    BeExchangeAnyMultiApi,
    RegisterChainApi,
    EmigrateAssetApi,
    ImmigrateAssetApi,
} from "./atom_transaction";
import { GenerateMigrateCertificateApi, FromAuthSignatureMigrateCertificateApi, ToAuthSignatureMigrateCertificateApi } from "./migrate_certificate";
import {
    VerifyAddressApi,
    VerifyPublicKeyApi,
    GenerateKeypairApi,
    GenerateAccountApi,
    GenerateAddressBySecretApi,
    GenerateAddressByPublicKeyApi,
    AsymmetricEncryptApi,
    AsymmetricDecryptApi,
    CalcTransactionMinFeeApi,
    GenerateCiphertextSignatureApi,
} from "./atom_common";
import { COMMON_API_PATH, GENERATE_TRANSACTION_API_PATH, MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class TransactionApi {
    private __TRANSACTION_API_MAP = new Map<BFMetaPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH, BFMetaPcSdk.Transaction.TransactionApi>();
    private __MIGRATE_CERTIFICATE_API_MAP = new Map<BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH, BFMetaPcSdk.CrossChain.MigrateCertificateApi>();
    private __COMMON_API_MAP = new Map<BFMetaPcSdk.Common.COMMON_API_PATH, BFMetaPcSdk.Common.CommonApi>();

    constructor(private __networkHelper: BFMetaPcSdk.NetworkHelper) {
        this.__init();
    }

    private __init() {
        const {
            __networkHelper: networkHelper,
            __TRANSACTION_API_MAP: TRANSACTION_API_MAP,
            __MIGRATE_CERTIFICATE_API_MAP: MIGRATE_CERTIFICATE_API_MAP,
            __COMMON_API_MAP: COMMON_API_MAP,
        } = this;

        const commonTransactionApi = new CommonTransactionApi(networkHelper);
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
        const issueEntityFactoryApi = new IssueEntityFactoryApi(networkHelper);
        const issueEntityFactoryV1Api = new IssueEntityFactoryV1Api(networkHelper);
        const issueEntityApi = new IssueEntityApi(networkHelper);
        const destoryEntityApi = new DestoryEntityApi(networkHelper);
        const transferAnyApi = new TransferAnyApi(networkHelper);
        const giftAnyApi = new GiftAnyApi(networkHelper);
        const grabAnyApi = new GrabAnyApi(networkHelper);
        const toExchangeAnyApi = new ToExchangeAnyApi(networkHelper);
        const beExchangeAnyApi = new BeExchangeAnyApi(networkHelper);
        const issueEntityMultiApi = new IssueEntityMultiApi(networkHelper);
        const toExchangeAnyMultiApi = new ToExchangeAnyMultiApi(networkHelper);
        const beExchangeAnyMultiApi = new BeExchangeAnyMultiApi(networkHelper);
        const registerChainApi = new RegisterChainApi(networkHelper);
        const emigrateAssetApi = new EmigrateAssetApi(networkHelper);
        const immigrateAssetApi = new ImmigrateAssetApi(networkHelper);

        TRANSACTION_API_MAP.set(commonTransactionApi.GENERATE_API_PATH, commonTransactionApi);
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
        TRANSACTION_API_MAP.set(issueEntityFactoryApi.GENERATE_API_PATH, issueEntityFactoryApi);
        TRANSACTION_API_MAP.set(issueEntityFactoryV1Api.GENERATE_API_PATH, issueEntityFactoryV1Api);
        TRANSACTION_API_MAP.set(issueEntityApi.GENERATE_API_PATH, issueEntityApi);
        TRANSACTION_API_MAP.set(destoryEntityApi.GENERATE_API_PATH, destoryEntityApi);
        TRANSACTION_API_MAP.set(toExchangeAnyApi.GENERATE_API_PATH, toExchangeAnyApi);
        TRANSACTION_API_MAP.set(beExchangeAnyApi.GENERATE_API_PATH, beExchangeAnyApi);
        TRANSACTION_API_MAP.set(transferAnyApi.GENERATE_API_PATH, transferAnyApi);
        TRANSACTION_API_MAP.set(giftAnyApi.GENERATE_API_PATH, giftAnyApi);
        TRANSACTION_API_MAP.set(grabAnyApi.GENERATE_API_PATH, grabAnyApi);
        TRANSACTION_API_MAP.set(issueEntityMultiApi.GENERATE_API_PATH, issueEntityMultiApi);
        TRANSACTION_API_MAP.set(toExchangeAnyMultiApi.GENERATE_API_PATH, toExchangeAnyMultiApi);
        TRANSACTION_API_MAP.set(beExchangeAnyMultiApi.GENERATE_API_PATH, beExchangeAnyMultiApi);
        TRANSACTION_API_MAP.set(registerChainApi.GENERATE_API_PATH, registerChainApi);
        TRANSACTION_API_MAP.set(emigrateAssetApi.GENERATE_API_PATH, emigrateAssetApi);
        TRANSACTION_API_MAP.set(immigrateAssetApi.GENERATE_API_PATH, immigrateAssetApi);

        Object.freeze(TRANSACTION_API_MAP);

        const generateMigrateCertificateApi = new GenerateMigrateCertificateApi(networkHelper);
        const fromAuthSignatureMigrateCertificateApi = new FromAuthSignatureMigrateCertificateApi(networkHelper);
        const toAuthSignatureMigrateCertificateApi = new ToAuthSignatureMigrateCertificateApi(networkHelper);

        MIGRATE_CERTIFICATE_API_MAP.set(generateMigrateCertificateApi.GENERATE_API_PATH, generateMigrateCertificateApi);
        MIGRATE_CERTIFICATE_API_MAP.set(fromAuthSignatureMigrateCertificateApi.GENERATE_API_PATH, fromAuthSignatureMigrateCertificateApi);
        MIGRATE_CERTIFICATE_API_MAP.set(toAuthSignatureMigrateCertificateApi.GENERATE_API_PATH, toAuthSignatureMigrateCertificateApi);

        Object.freeze(MIGRATE_CERTIFICATE_API_MAP);

        const verifyAddressApi = new VerifyAddressApi(networkHelper);
        const verifyPublicKeyApi = new VerifyPublicKeyApi(networkHelper);
        const generateKeypairApi = new GenerateKeypairApi(networkHelper);
        const generateAccountApi = new GenerateAccountApi(networkHelper);
        const generateAddressBySecretApi = new GenerateAddressBySecretApi(networkHelper);
        const generateAddressByPublicKeyApi = new GenerateAddressByPublicKeyApi(networkHelper);
        const asymmetricEncryptApi = new AsymmetricEncryptApi(networkHelper);
        const asymmetricDecryptApi = new AsymmetricDecryptApi(networkHelper);
        const calcTransactionMinFeeApi = new CalcTransactionMinFeeApi(networkHelper);
        const generateCiphertextSignatureApi = new GenerateCiphertextSignatureApi(networkHelper);

        COMMON_API_MAP.set(verifyAddressApi.EXEC_API_PATH, verifyAddressApi);
        COMMON_API_MAP.set(verifyPublicKeyApi.EXEC_API_PATH, verifyPublicKeyApi);
        COMMON_API_MAP.set(generateKeypairApi.EXEC_API_PATH, generateKeypairApi);
        COMMON_API_MAP.set(generateAccountApi.EXEC_API_PATH, generateAccountApi);
        COMMON_API_MAP.set(generateAddressBySecretApi.EXEC_API_PATH, generateAddressBySecretApi);
        COMMON_API_MAP.set(generateAddressByPublicKeyApi.EXEC_API_PATH, generateAddressByPublicKeyApi);
        COMMON_API_MAP.set(asymmetricEncryptApi.EXEC_API_PATH, asymmetricEncryptApi);
        COMMON_API_MAP.set(asymmetricDecryptApi.EXEC_API_PATH, asymmetricDecryptApi);
        COMMON_API_MAP.set(calcTransactionMinFeeApi.EXEC_API_PATH, calcTransactionMinFeeApi);
        COMMON_API_MAP.set(generateCiphertextSignatureApi.EXEC_API_PATH, generateCiphertextSignatureApi);

        Object.freeze(COMMON_API_MAP);
    }

    // #region transaction
    private __getTransactionApi<T extends BFMetaPcSdk.Transaction.TransactionApi>(apiPath: BFMetaPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH) {
        return this.__TRANSACTION_API_MAP.get(apiPath) as T;
    }

    async broadcastTransaction(argv: BFChainCore.TransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.CommonTransactionApi>(GENERATE_TRANSACTION_API_PATH.TR_COMMON);
        const result = await api.broadcastTransaction(argv);
        return result;
    }

    /**创建设置用户名事件 */
    async generateUsername(argv: BFMetaPcSdk.Transaction.UsernameTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置用户名事件 */
    async broadcastUsername(transaction: BFChainCore.UsernameTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置用户名事件 */
    async sendUsername(argv: BFMetaPcSdk.Transaction.UsernameTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.UsernameApi>(GENERATE_TRANSACTION_API_PATH.TR_USERNAME);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置安全密码事件 */
    async generateSignature(argv: BFMetaPcSdk.Transaction.SignatureTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置安全密码事件 */
    async broadcastSignature(transaction: BFChainCore.SignatureTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置安全密码事件 */
    async sendSignature(argv: BFMetaPcSdk.Transaction.SignatureTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignatureApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册受托人事件 */
    async generateDelegate(argv: BFMetaPcSdk.Transaction.DelegateTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册受托人事件 */
    async broadcastDelegate(transaction: BFChainCore.DelegateTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册受托人事件 */
    async sendDelegate(argv: BFMetaPcSdk.Transaction.DelegateTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DelegateApi>(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建开启收票事件 */
    async generateAcceptVote(argv: BFMetaPcSdk.Transaction.AcceptVoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送开启收票事件 */
    async broadcastAcceptVote(transaction: BFChainCore.AcceptVoteTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送开启收票事件 */
    async sendAcceptVote(argv: BFMetaPcSdk.Transaction.AcceptVoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.AcceptVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建关闭收票事件 */
    async generateRejectVote(argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送关闭收票事件 */
    async broadcastRejectVote(transaction: BFChainCore.RejectVoteTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送关闭收票事件 */
    async sendRejectVote(argv: BFMetaPcSdk.Transaction.RejectVoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RejectVoteApi>(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建治理投票事件 */
    async generateVote(argv: BFMetaPcSdk.Transaction.VoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送治理投票事件 */
    async broadcastVote(transaction: BFChainCore.VoteTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送治理投票事件 */
    async sendVote(argv: BFMetaPcSdk.Transaction.VoteTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.VoteApi>(GENERATE_TRANSACTION_API_PATH.TR_VOTE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益发行事件 */
    async generateIssueAsset(argv: BFMetaPcSdk.Transaction.IssueAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益发行事件 */
    async broadcastIssueAsset(transaction: BFChainCore.IssueAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益发行事件 */
    async sendIssueAsset(argv: BFMetaPcSdk.Transaction.IssueAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益转移事件 */
    async generateTransferAsset(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益转移事件 */
    async broadcastTransferAsset(transaction: BFChainCore.TransferAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益转移事件 */
    async sendTransferAsset(argv: BFMetaPcSdk.Transaction.TransferAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益销毁事件 */
    async generateDestoryAsset(argv: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益销毁事件 */
    async broadcastDestoryAsset(transaction: BFChainCore.DestoryAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益销毁事件 */
    async sendDestoryAsset(argv: BFMetaPcSdk.Transaction.DestoryAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益赠送事件 */
    async generateGiftAsset(argv: BFMetaPcSdk.Transaction.GiftAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益赠送事件 */
    async broadcastGiftAsset(transaction: BFChainCore.GiftAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益赠送事件 */
    async sendGiftAsset(argv: BFMetaPcSdk.Transaction.GiftAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受权益赠送事件 */
    async generateGrabAsset(argv: BFMetaPcSdk.Transaction.GrabAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受权益赠送事件 */
    async broadcastGrabAsset(transaction: BFChainCore.GrabAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受权益赠送事件 */
    async sendGrabAsset(argv: BFMetaPcSdk.Transaction.GrabAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益委托事件 */
    async generateTrustAsset(argv: BFMetaPcSdk.Transaction.TrustAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益委托事件 */
    async broadcastTrustAsset(transaction: BFChainCore.TrustAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益委托事件 */
    async sendTrustAsset(argv: BFMetaPcSdk.Transaction.TrustAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TrustAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建签收权益委托事件 */
    async generateSignForAsset(argv: BFMetaPcSdk.Transaction.SignForAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送签收权益委托事件 */
    async broadcastSignForAsset(transaction: BFChainCore.SignForAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送签收权益委托事件 */
    async sendSignForAsset(argv: BFMetaPcSdk.Transaction.SignForAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SignForAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益交换事件 */
    async generateToExchangeAsset(argv: BFMetaPcSdk.Transaction.ToExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益交换事件 */
    async broadcastToExchangeAsset(transaction: BFChainCore.ToExchangeAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益交换事件 */
    async sendToExchangeAsset(argv: BFMetaPcSdk.Transaction.ToExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受权益交换事件 */
    async generateBeExchangeAsset(argv: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受权益交换事件 */
    async broadcastBeExchangeAsset(transaction: BFChainCore.BeExchangeAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受权益交换事件 */
    async sendBeExchangeAsset(argv: BFMetaPcSdk.Transaction.BeExchangeAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建 dapp 发行事件 */
    async generateDApp(argv: BFMetaPcSdk.Transaction.DAppTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送 dapp 发行事件 */
    async broadcastDApp(transaction: BFChainCore.DAppTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送 dapp 发行事件 */
    async sendDApp(argv: BFMetaPcSdk.Transaction.DAppTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建 dapp 购买事件 */
    async generateDAppPurchasing(argv: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送 dapp 购买事件 */
    async broadcastDAppPurchasing(transaction: BFChainCore.DAppPurchasingTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送 dapp 购买事件 */
    async sendDAppPurchasing(argv: BFMetaPcSdk.Transaction.DAppPurchasingTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DAppPurchasingApi>(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建存证事件 */
    async generateMark(argv: BFMetaPcSdk.Transaction.MarkTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送存证事件 */
    async broadcastMark(transaction: BFChainCore.MarkTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送存证事件 */
    async sendMark(argv: BFMetaPcSdk.Transaction.MarkTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.MarkApi>(GENERATE_TRANSACTION_API_PATH.TR_MARK);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册/注销链域名事件 */
    async generateLocationName(argv: BFMetaPcSdk.Transaction.LocationNameTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册/注销链域名事件 */
    async broadcastLocationName(transaction: BFChainCore.LocationNameTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册/注销链域名事件 */
    async sendLocationName(argv: BFMetaPcSdk.Transaction.LocationNameTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.LocationNameApi>(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置链域名管理员事件 */
    async generateSetLnsManager(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置链域名管理员事件 */
    async broadcastSetLnsManager(transaction: BFChainCore.SetLnsManagerTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置链域名管理员事件 */
    async sendSetLnsManager(argv: BFMetaPcSdk.Transaction.SetLnsManagerTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsManagerApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建设置链域名解析值事件 */
    async generateSetLnsRecordValue(argv: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送设置链域名解析值事件 */
    async broadcastSetLnsRecordValue(transaction: BFChainCore.SetLnsRecordValueTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送设置链域名解析值事件 */
    async sendSetLnsRecordValue(argv: BFMetaPcSdk.Transaction.SetLnsRecordValueTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.SetLnsRecordValueApi>(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建资产交换事件 */
    async generateToExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送资产交换事件 */
    async broadcastToExchangeSpecialAsset(transaction: BFChainCore.ToExchangeSpecialAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送资产交换事件 */
    async sendToExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.ToExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受资产交换事件 */
    async generateBeExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受资产交换事件 */
    async broadcastBeExchangeSpecialAsset(transaction: BFChainCore.BeExchangeSpecialAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受资产交换事件 */
    async sendBeExchangeSpecialAsset(argv: BFMetaPcSdk.Transaction.BeExchangeSpecialAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeSpecialAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建发行非同质权益模板事件 */
    async generateIssueEntityFactory(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送发行非同质权益模板事件 */
    async broadcastIssueEntityFactory(transaction: BFChainCore.IssueEntityFactoryTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送发行非同质权益模板事件 */
    async sendIssueEntityFactory(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建发行非同质权益模板事件 */
    async generateIssueEntityFactoryV1(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryV1Api>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送发行非同质权益模板事件 */
    async broadcastIssueEntityFactoryV1(transaction: BFChainCore.IssueEntityFactoryTransactionV1JSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryV1Api>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送发行非同质权益模板事件 */
    async sendIssueEntityFactoryV1(argv: BFMetaPcSdk.Transaction.IssueEntityFactoryTransactionV1Params) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityFactoryV1Api>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建发行非同质权益事件 */
    async generateIssueEntity(argv: BFMetaPcSdk.Transaction.IssueEntityTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送发行非同质权益事件 */
    async broadcastIssueEntity(transaction: BFChainCore.IssueEntityTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送发行非同质权益事件 */
    async sendIssueEntity(argv: BFMetaPcSdk.Transaction.IssueEntityTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建销毁非同质权益事件 */
    async generateDestoryEntity(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送销毁非同质权益事件 */
    async broadcastDestoryEntity(transaction: BFChainCore.DestoryEntityTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送销毁非同质权益事件 */
    async sendDestoryEntity(argv: BFMetaPcSdk.Transaction.DestoryEntityTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.DestoryEntityApi>(GENERATE_TRANSACTION_API_PATH.TR_DESTORY_ENTITY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建任意资产交换事件 */
    async generateToExchangeAny(argv: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送任意资产交换事件 */
    async broadcastToExchangeAny(transaction: BFChainCore.ToExchangeAnyTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送任意资产交换事件 */
    async sendToExchangeAny(argv: BFMetaPcSdk.Transaction.ToExchangeAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受任意资产交换事件 */
    async generateBeExchangeAny(argv: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受任意资产交换事件 */
    async broadcastBeExchangeAny(transaction: BFChainCore.BeExchangeAnyTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受任意资产交换事件 */
    async sendBeExchangeAny(argv: BFMetaPcSdk.Transaction.BeExchangeAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建任意资产转移事件 */
    async generateTransferAny(argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送任意资产转移事件 */
    async broadcastTransferAny(transaction: BFChainCore.TransferAnyTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送任意资产转移事件 */
    async sendTransferAny(argv: BFMetaPcSdk.Transaction.TransferAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.TransferAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建任意资产赠送事件 */
    async generateGiftAny(argv: BFMetaPcSdk.Transaction.GiftAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送任意资产赠送事件 */
    async broadcastGiftAny(transaction: BFChainCore.GiftAnyTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送任意资产赠送事件 */
    async sendGiftAny(argv: BFMetaPcSdk.Transaction.GiftAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GiftAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受任意资产赠送事件 */
    async generateGrabAny(argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受任意资产赠送事件 */
    async broadcastGrabAny(transaction: BFChainCore.GrabAnyTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受任意资产赠送事件 */
    async sendGrabAny(argv: BFMetaPcSdk.Transaction.GrabAnyTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.GrabAnyApi>(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建批量发行非同质权益模板事件 */
    async generateIssueEntityMulti(argv: BFMetaPcSdk.Transaction.IssueEntityMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送批量发行非同质权益模板事件 */
    async broadcastIssueEntityMulti(transaction: BFChainCore.IssueEntityMultiTransactionV1JSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送批量发行非同质权益模板事件 */
    async sendIssueEntityMulti(argv: BFMetaPcSdk.Transaction.IssueEntityMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.IssueEntityMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建批量任意资产交换事件 */
    async generateToExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送批量任意资产交换事件 */
    async broadcastToExchangeAnyMulti(transaction: BFChainCore.ToExchangeAnyMultiTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送批量任意资产交换事件 */
    async sendToExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.ToExchangeAnyMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ToExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建接受批量任意资产交换事件 */
    async generateBeExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送接受批量任意资产交换事件 */
    async broadcastBeExchangeAnyMulti(transaction: BFChainCore.BeExchangeAnyMultiTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送接受批量任意资产交换事件 */
    async sendBeExchangeAnyMulti(argv: BFMetaPcSdk.Transaction.BeExchangeAnyMultiTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.BeExchangeAnyMultiApi>(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建注册链事件 */
    async generateRegisterChain(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送注册链事件 */
    async broadcastRegisterChain(transaction: BFChainCore.RegisterChainTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送注册链事件 */
    async sendRegisterChain(argv: BFMetaPcSdk.Transaction.RegisterChainTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.RegisterChainApi>(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益迁出事件 */
    async generateEmigrateAsset(argv: BFMetaPcSdk.Transaction.EmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益迁出事件 */
    async broadcastEmigrateAsset(transaction: BFChainCore.EmigrateAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益迁出事件 */
    async sendEmigrateAsset(argv: BFMetaPcSdk.Transaction.EmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.EmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }

    /**创建权益迁入事件 */
    async generateImmigrateAsset(argv: BFMetaPcSdk.Transaction.ImmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.generateTransaction(argv);
        return result;
    }
    /**发送权益迁入事件 */
    async broadcastImmigrateAsset(transaction: BFChainCore.ImmigrateAssetTransactionJSON) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.broadcastTransaction(transaction);
        return result;
    }
    /**创建并发送权益迁入事件 */
    async sendImmigrateAsset(argv: BFMetaPcSdk.Transaction.ImmigrateAssetTransactionParams) {
        const api = this.__getTransactionApi<BFMetaPcSdk.Transaction.ImmigrateAssetApi>(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET);
        const result = await api.sendTransaction(argv);
        return result;
    }
    // #endregion

    // #region migrateCertificate
    private __getMigrateCertificateApi<T extends BFMetaPcSdk.CrossChain.MigrateCertificateApi>(apiPath: BFMetaPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH) {
        return this.__MIGRATE_CERTIFICATE_API_MAP.get(apiPath) as T;
    }

    /**创建权益迁移凭证 */
    async generateMigrateCertificate(argv: BFMetaPcSdk.CrossChain.GenerateMigrateCertificateParams) {
        const api = this.__getMigrateCertificateApi<BFMetaPcSdk.CrossChain.GenerateMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
    /**创建权益迁移凭证的迁出授权签名 */
    async fromAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const api = this.__getMigrateCertificateApi<BFMetaPcSdk.CrossChain.FromAuthSignatureMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
    /**创建权益迁移凭证的迁入授权签名 */
    async toAuthSignatureMigrateCertificate(argv: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const api = this.__getMigrateCertificateApi<BFMetaPcSdk.CrossChain.ToAuthSignatureMigrateCertificateApi>(
            MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_TO_AUTH_SIGNATURE
        );
        const result = await api.sendPostRequest(argv);
        return result;
    }
    // #endregion

    // #region common
    private __getCommonApi<T extends BFMetaPcSdk.Common.CommonApi>(apiPath: BFMetaPcSdk.Common.COMMON_API_PATH) {
        return this.__COMMON_API_MAP.get(apiPath) as T;
    }

    /**是否是一个地址 */
    async verifyAddress(argv: BFMetaPcSdk.Common.VerifyAddressParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.VerifyAddressApi>(COMMON_API_PATH.VERIFY_ADDRESS);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**是否是一个公钥 */
    async verifyPublicKey(argv: BFMetaPcSdk.Common.VerifyPublicKeyParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.VerifyPublicKeyApi>(COMMON_API_PATH.VERIFY_PUBLICKEY);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**创建账户 */
    async generateAccount(argv: BFMetaPcSdk.Common.GenerateAccountParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.GenerateAccountApi>(COMMON_API_PATH.GENERATE_ACCOUNT);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**根据密钥获取账户 */
    async generateAddressBySecret(argv: BFMetaPcSdk.Common.GenerateAddressBySecretParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.GenerateAddressBySecretApi>(COMMON_API_PATH.GENERATE_ADDRESS_BY_SECRET);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**根据公钥获取账户 */
    async generateAddressByPublicKey(argv: BFMetaPcSdk.Common.GenerateAddressByPublicKeyParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.GenerateAddressByPublicKeyApi>(COMMON_API_PATH.GENERATE_ADDRESS_BY_PUBLICKEY);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**创建公私钥对 */
    async generateKeypair(argv: BFMetaPcSdk.Common.GenerateKeypairParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.GenerateKeypairApi>(COMMON_API_PATH.GENERATE_KEYPAIR);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**非对称加密 */
    async asymmetricEncrypt(argv: BFMetaPcSdk.Common.AsymmetricEncryptParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.AsymmetricEncryptApi>(COMMON_API_PATH.ASYMMETRIC_ENCRYPT);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**非对称解密 */
    async asymmetricDecrypt(argv: BFMetaPcSdk.Common.AsymmetricDecryptParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.AsymmetricDecryptApi>(COMMON_API_PATH.ASYMMETRIC_DECRYPT);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**计算最低手续费 */
    async calcTransactionMinFee(argv: BFMetaPcSdk.Common.CalcTransactionMinFeeParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.CalcTransactionMinFeeApi>(COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE);
        const result = await api.sendPostRequest(argv);
        return result;
    }

    /**创建加密签名 */
    async generateCiphertextSignature(argv: BFMetaPcSdk.Common.GenerateCiphertextSignatureParams) {
        const api = this.__getCommonApi<BFMetaPcSdk.Common.GenerateCiphertextSignatureApi>(COMMON_API_PATH.GENERATE_CIPHERTEXT_SIGNATURE);
        const result = await api.sendPostRequest(argv);
        return result;
    }
    // #endregion
}
