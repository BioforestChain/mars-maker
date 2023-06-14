import { Injectable, Inject } from "@bfchain/util";
import { BFChainCore, RANGE_TYPE, RECORD_OPERATION_TYPE } from "@bfchain/core";
import {
    myAcceptVote,
    myBeExchangeAny,
    myBeExchangeAnyMulti,
    myBeExchangeAnyMultiAll,
    myBeExchangeAsset,
    myBeExchangeSpecialAsset,
    myDApp,
    myDAppPurchasing,
    myDelegate,
    myDestroyAsset,
    myDestroyEntity,
    myEmigrateAsset,
    myGiftAny,
    myGiftAsset,
    myGrabAny,
    myGrabAsset,
    myImmigrateAsset,
    myIssueAsset,
    myIssueEntityFactory,
    myIssueEntityFactoryV1,
    myIssueEntityMultiV1,
    myIssueEntityV1,
    myLocationName,
    myMacro,
    myMacroCall,
    myMark,
    myMultiple,
    myPromise,
    myPromiseResolve,
    myRegisterChain,
    myRejectVote,
    mySetLnsManager,
    mySetLnsRecordValue,
    mySignature,
    mySignForAsset,
    myToExchangeAny,
    myToExchangeAnyMulti,
    myToExchangeAnyMultiAll,
    myToExchangeAsset,
    myToExchangeSpecialAsset,
    myTransferAny,
    myTransferAsset,
    myTrustAsset,
    myUsername,
    myVote,
} from "@bfchain/coretools";
import {
    Verifier,
    TR_SIGNATURE,
    TR_USERNAME,
    TR_DELEGATE,
    TR_ACCEPT_VOTE,
    TR_REJECT_VOTE,
    TR_VOTE,
    TR_ISSUE_ASSET,
    TR_TRANSFER_ASSET,
    TR_DESTROY_ASSET,
    TR_GIFT_ASSET,
    TR_GRAB_ASSET,
    TR_TRUST_ASSET,
    TR_SIGN_FOR_ASSET,
    TR_TO_EXCHANGE_ASSET,
    TR_BE_EXCHANGE_ASSET,
    TR_DAPP,
    TR_DAPP_PURCHASING,
    TR_MARK,
    TR_LOCATION_NAME,
    TR_SET_LNS_MANAGER,
    TR_SET_LNS_RECORD_VALUE,
    TR_TO_EXCHANGE_SPECIAL_ASSET,
    TR_BE_EXCHANGE_SPECIAL_ASSET,
    TR_REGISTER_CHAIN,
    TR_EMIGRATE_ASSET,
    TR_IMMIGRATE_ASSET,
    TR_ISSUE_ENTITY_FACTORY,
    TR_ISSUE_ENTITY,
    TR_ISSUE_ENTITY_MULTI_V1,
    TR_DESTROY_ENTITY,
    TR_TRANSFER_ANY,
    TR_GIFT_ANY,
    TR_GRAB_ANY,
    TR_TO_EXCHANGE_ANY,
    TR_BE_EXCHANGE_ANY,
    TR_TO_EXCHANGE_ANY_MULTI,
    TR_BE_EXCHANGE_ANY_MULTI,
    TR_TO_EXCHANGE_ANY_MULTI_ALL,
    TR_BE_EXCHANGE_ANY_MULTI_ALL,
} from "../schema";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";
import { INJECT_MODULE } from "../constants";
import { Route } from "../decorators";
import { GENERATE_TRANSACTION_API_PATH } from "@bfmeta/transaction-maker-core";

const { ArgumentIllegalException } = TransactionMakerExceptionGenerator("Transaction-Maker-Server", "TransactionService");

@Injectable()
export class TransactionService {
    @Inject(INJECT_MODULE.CORE)
    public bfchainCore!: BFChainCore;

    constructor(private __verifier: Verifier) {}

    private __getTransactionBody(request: TransactionMaker.Transaction.TransactionCommonParams) {
        const exception = {
            target: "request",
        };
        if (request.rangeType) {
            if (
                request.rangeType !== RANGE_TYPE.EMPTY &&
                request.rangeType !== RANGE_TYPE.MULTI_ADDRESS &&
                request.rangeType !== RANGE_TYPE.MULTI_DAPPID &&
                request.rangeType !== RANGE_TYPE.MULTI_LOCATION_NAME
            ) {
                throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: "request.rangeType",
                    ...exception,
                });
            }
        }
        if (request.rangeType && request.rangeType !== RANGE_TYPE.EMPTY) {
            if (!(request.range && request.range.length > 0)) {
                throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_REQUIRE, {
                    prop: "request.range",
                    ...exception,
                });
            }
        }
        let remark = request.remark;
        const binaryInfos = request.binaryInfos;
        if (binaryInfos) {
            const keys = binaryInfos.map((v) => v.key);
            const fileInfos = binaryInfos.map((v) => v.fileInfo);
            remark = this.__setTransactionRemark(remark ?? {}, keys, fileInfos);
        }
        const txBody: BFChainCoreTools.MyTransactionArgv = {
            version: this.bfchainCore.config.version,
            secret: request.secret,
            secondSecretInfo: request.secondSecretInfo,
            recipientId: request.recipientId,
            rangeType: request.rangeType,
            range: request.range,
            timestamp: this.bfchainCore.time.getTimestamp(),
            fee: request.fee,
            applyBlockHeight: request.applyBlockHeight,
            remark,
            dappid: request.dappid,
            lns: request.lns,
            sourceIP: request.sourceIP,
            fromMagic: request.fromMagic,
            toMagic: request.toMagic,
            effectiveBlockHeight:
                (request.numberOfEffectiveBlocks && request.numberOfEffectiveBlocks + request.applyBlockHeight) ||
                request.applyBlockHeight + this.bfchainCore.config.maxApplyAndConfirmedBlockHeightDiff,
        };
        return txBody;
    }

    private __getAccountPowInfo(request: TransactionMaker.Transaction.TransactionCommonParams) {
        const { accountLastRoundInfo, applyBlockHeight } = request;
        const accountPowInfo: BFChainCoreTools.AccountPowInfoModel = { round: 1, txCount: 0, equity: "0" };
        if (accountLastRoundInfo) {
            accountPowInfo.round = this.bfchainCore.blockHelper.calcRoundByHeight(applyBlockHeight) - 1;
            accountPowInfo.txCount = accountLastRoundInfo.txCount;
            accountPowInfo.equity = accountLastRoundInfo.equity;
        }
        return accountPowInfo;
    }

    /**针对节点存储设置交易对象的remark字段 */
    private __setTransactionRemark(remark: { [key: string]: string }, keys: string[], fileInfos: { name: string; size: number }[]): { [key: string]: string } {
        if (keys.length !== fileInfos.length) {
            throw new Error("键值长度和文件信息长度不匹配");
        }
        if (keys.length == 0) {
            return remark;
        }
        remark.kvStorageKey = keys.join(",");
        remark.kvStorageFileInfo = fileInfos
            .map((v) => {
                if (v.name && v.size) {
                    return v.name + "_" + v.size;
                }
                return "";
            })
            .join(",");
        return remark;
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_USERNAME)
    async generateUsername(request: TransactionMaker.Transaction.UsernameTransactionParams) {
        this.__verifier.verify(request, TR_USERNAME);
        const tr = await myUsername.generateUsername(
            this.__getTransactionBody(request),
            { alias: request.alias },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE)
    async generateSignature(request: TransactionMaker.Transaction.SignatureTransactionParams) {
        this.__verifier.verify(request, TR_SIGNATURE);
        const tr = await mySignature.generateSignature(
            this.__getTransactionBody(request),
            { publicKey: "" },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.newSecondSecretInfo
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_DELEGATE)
    async generateDelegate(request: TransactionMaker.Transaction.DelegateTransactionParams) {
        this.__verifier.verify(request, TR_DELEGATE);
        const tr = await myDelegate.generateDelegate(this.__getTransactionBody(request), this.__getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ACCEPT_VOTE)
    async generateAcceptVote(request: TransactionMaker.Transaction.AcceptVoteTransactionParams) {
        this.__verifier.verify(request, TR_ACCEPT_VOTE);
        const tr = await myAcceptVote.generateAcceptVote(this.__getTransactionBody(request), this.__getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_REJECT_VOTE)
    async generateRejectVote(request: TransactionMaker.Transaction.RejectVoteTransactionParams) {
        this.__verifier.verify(request, TR_REJECT_VOTE);
        const tr = await myRejectVote.generateRejectVote(this.__getTransactionBody(request), this.__getAccountPowInfo(request), this.bfchainCore);
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_VOTE)
    async generateVote(request: TransactionMaker.Transaction.VoteTransactionParams) {
        this.__verifier.verify(request, TR_VOTE);
        const tr = await myVote.generateVote(
            this.__getTransactionBody(request),
            { equity: request.equity },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ASSET)
    async generateAsset(request: TransactionMaker.Transaction.IssueAssetTransactionParams) {
        this.__verifier.verify(request, TR_ISSUE_ASSET);
        const assetInfo = request.assetInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueAsset.generateAsset(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                assetType: assetInfo.assetType,
                expectedIssuedAssets: assetInfo.expectedIssuedAssets,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ASSET)
    async generateTransferAsset(request: TransactionMaker.Transaction.TransferAssetTransactionParams) {
        this.__verifier.verify(request, TR_TRANSFER_ASSET);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myTransferAsset.generateTransferAsset(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_DESTROY_ASSET)
    async generateDestroyAsset(request: TransactionMaker.Transaction.DestroyAssetTransactionParams) {
        this.__verifier.verify(request, TR_DESTROY_ASSET);
        const assetInfo = request.assetInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDestroyAsset.generateDestroyAsset(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                assetType: assetInfo.assetType,
                amount: assetInfo.amount,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TRUST_ASSET)
    async generateTrustAsset(request: TransactionMaker.Transaction.TrustAssetTransactionParams) {
        this.__verifier.verify(request, TR_TRUST_ASSET);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myTrustAsset.generateTrustAsset(
            this.__getTransactionBody(request),
            {
                trustees: request.trustees,
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
                numberOfSignFor: request.numberOfSignFor,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_SIGN_FOR_ASSET)
    async generateSignForAsset(request: TransactionMaker.Transaction.SignForAssetTransactionParams) {
        this.__verifier.verify(request, TR_SIGN_FOR_ASSET);
        const config = this.bfchainCore.config;
        const trustAsset = request.trustAsset;
        const tr = await mySignForAsset.generateSignForAsset(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                trustSenderId: request.trustSenderId,
                trustRecipientId: request.recipientId,
                trustAsset: {
                    trustees: trustAsset.trustees,
                    sourceChainMagic: trustAsset.sourceChainMagic || config.magic,
                    sourceChainName: trustAsset.sourceChainName || config.chainName,
                    assetType: trustAsset.assetType,
                    amount: trustAsset.amount,
                    numberOfSignFor: trustAsset.numberOfSignFor,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ASSET)
    async generateGiftAsset(request: TransactionMaker.Transaction.GiftAssetTransactionParams) {
        this.__verifier.verify(request, TR_GIFT_ASSET);
        const assetInfo = request.assetInfo;
        const { magic, chainName, assetType } = this.bfchainCore.config;
        const tr = await myGiftAsset.generateGiftAsset(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                sourceChainMagic: assetInfo.sourceChainMagic || magic,
                sourceChainName: assetInfo.sourceChainName || chainName,
                assetType: assetInfo.assetType || assetType,
                amount: assetInfo.amount,
                totalGrabableTimes: request.totalGrabableTimes,
                giftDistributionRule: request.giftDistributionRule as number,
            },
            request.ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ASSET)
    async generateGrabAsset(request: TransactionMaker.Transaction.GrabAssetTransactionParams) {
        this.__verifier.verify(request, TR_GRAB_ASSET);
        const config = this.bfchainCore.config;
        const giftAsset = request.giftAsset;
        const tr = await myGrabAsset.generateGrabAsset(
            this.__getTransactionBody(request),
            {
                blockSignature: request.blockSignature,
                transactionSignature: request.transactionSignature,
                amount: "0",
                giftAsset: {
                    cipherPublicKeys: giftAsset.cipherPublicKeys,
                    sourceChainMagic: giftAsset.sourceChainMagic || config.magic,
                    sourceChainName: giftAsset.sourceChainName || config.chainName,
                    assetType: giftAsset.assetType || config.assetType,
                    amount: giftAsset.amount,
                    totalGrabableTimes: giftAsset.totalGrabableTimes,
                    beginUnfrozenBlockHeight: giftAsset.beginUnfrozenBlockHeight,
                    giftDistributionRule: giftAsset.giftDistributionRule,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ASSET)
    async generateToExchangeAsset(request: TransactionMaker.Transaction.ToExchangeAssetTransactionParams) {
        this.__verifier.verify(request, TR_TO_EXCHANGE_ASSET);
        const { toExchangeInfo, beExchangeInfo, exchangeRate, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myToExchangeAsset.generateToExchangeAsset(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeAsset: toExchangeInfo.toExchangeAsset,
                beExchangeAsset: beExchangeInfo.beExchangeAsset,
                toExchangeNumber: toExchangeInfo.toExchangeNumber,
                exchangeRate,
            },
            ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ASSET)
    async generateBeExchangeAsset(request: TransactionMaker.Transaction.BeExchangeAssetTransactionParams) {
        this.__verifier.verify(request, TR_BE_EXCHANGE_ASSET);
        const config = this.bfchainCore.config;
        const exchangeAsset = request.exchangeAsset;
        const tr = await myBeExchangeAsset.generateBeExchangeAsset(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                beExchangeNumber: request.beExchangeNumber,
                toExchangeNumber: request.toExchangeNumber,
                exchangeAsset: {
                    cipherPublicKeys: exchangeAsset.cipherPublicKeys,
                    toExchangeSource: exchangeAsset.toExchangeSource || config.magic,
                    beExchangeSource: exchangeAsset.beExchangeSource || config.magic,
                    toExchangeChainName: exchangeAsset.toExchangeChainName || config.chainName,
                    beExchangeChainName: exchangeAsset.beExchangeChainName || config.chainName,
                    toExchangeAsset: exchangeAsset.toExchangeAsset,
                    beExchangeAsset: exchangeAsset.beExchangeAsset,
                    toExchangeNumber: exchangeAsset.toExchangeNumber,
                    exchangeRate: exchangeAsset.exchangeRate,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_SPECIAL_ASSET)
    async generateToExchangeSpecialAsset(request: TransactionMaker.Transaction.ToExchangeSpecialAssetTransactionParams) {
        this.__verifier.verify(request, TR_TO_EXCHANGE_SPECIAL_ASSET);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfo, beExchangeInfo } = request;
        const tr = await myToExchangeSpecialAsset.generateToExchangeSpecialAsset(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeAsset: toExchangeInfo.toExchangeAsset,
                beExchangeAsset: beExchangeInfo.beExchangeAsset,
                exchangeNumber: request.exchangeNumber,
                exchangeAssetType: request.exchangeAssetType,
                exchangeDirection: request.exchangeDirection,
            },
            request.ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_SPECIAL_ASSET)
    async generateBeExchangeSpecialAsset(request: TransactionMaker.Transaction.BeExchangeSpecialAssetTransactionParams) {
        this.__verifier.verify(request, TR_BE_EXCHANGE_SPECIAL_ASSET);
        const config = this.bfchainCore.config;
        const exchangeSpecialAsset = request.exchangeSpecialAsset;
        const tr = await myBeExchangeSpecialAsset.generateBeExchangeSpecialAsset(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                exchangeSpecialAsset: {
                    cipherPublicKeys: exchangeSpecialAsset.cipherPublicKeys,
                    toExchangeSource: exchangeSpecialAsset.toExchangeSource || config.magic,
                    beExchangeSource: exchangeSpecialAsset.beExchangeSource || config.magic,
                    toExchangeChainName: exchangeSpecialAsset.toExchangeChainName || config.chainName,
                    beExchangeChainName: exchangeSpecialAsset.beExchangeChainName || config.chainName,
                    toExchangeAsset: exchangeSpecialAsset.toExchangeAsset,
                    beExchangeAsset: exchangeSpecialAsset.beExchangeAsset,
                    exchangeNumber: exchangeSpecialAsset.exchangeNumber,
                    exchangeAssetType: exchangeSpecialAsset.exchangeAssetType,
                    exchangeDirection: exchangeSpecialAsset.exchangeDirection,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_DAPP)
    async generateDApp(request: TransactionMaker.Transaction.DAppTransactionParams) {
        this.__verifier.verify(request, TR_DAPP);
        const dappInfo = request.dappInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDApp.generateDApp(
            this.__getTransactionBody(request),
            {
                sourceChainName: chainName,
                sourceChainMagic: magic,
                dappid: "",
                type: dappInfo.type as number,
                purchaseAsset: dappInfo.purchanseAsset,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            dappInfo.newDappid
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_DAPP_PURCHASING)
    async generateDapppurchasing(request: TransactionMaker.Transaction.DAppPurchasingTransactionParams) {
        this.__verifier.verify(request, TR_DAPP_PURCHASING);
        const dappInfo = request.dappInfo;
        const tr = await myDAppPurchasing.generateDapppurchasing(
            this.__getTransactionBody(request),
            {
                dappAsset: {
                    sourceChainName: this.bfchainCore.config.chainName,
                    sourceChainMagic: this.bfchainCore.config.magic,
                    dappid: dappInfo.dappid,
                    type: dappInfo.type as number,
                    purchaseAsset: dappInfo.purchanseAsset,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_MARK)
    async generateMark(request: TransactionMaker.Transaction.MarkTransactionParams) {
        this.__verifier.verify(request, TR_MARK);
        const { dappInfo } = request;
        const tr = await myMark.generateMark(
            this.__getTransactionBody(request),
            {
                action: request.action,
                content: request.content,
                dapp: {
                    sourceChainName: this.bfchainCore.config.chainName,
                    sourceChainMagic: this.bfchainCore.config.magic,
                    dappid: dappInfo.dappid,
                    type: dappInfo.type as number,
                    purchaseAsset: dappInfo.purchanseAsset,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_LOCATION_NAME)
    async generateLocationName(request: TransactionMaker.Transaction.LocationNameTransactionParams) {
        this.__verifier.verify(request, TR_LOCATION_NAME);
        const config = this.bfchainCore.config;
        const { name } = request;
        const tr = await myLocationName.generateLocationName(
            this.__getTransactionBody(request),
            {
                sourceChainName: config.chainName,
                sourceChainMagic: config.magic,
                name: name.endsWith(config.chainName) ? name : `${name}.${config.chainName}`,
                operationType: request.operationType as number,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_MANAGER)
    async generateSetLnsManager(request: TransactionMaker.Transaction.SetLnsManagerTransactionParams) {
        this.__verifier.verify(request, TR_SET_LNS_MANAGER);
        const tr = await mySetLnsManager.generateSetLnsManager(
            this.__getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                name: request.name,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_SET_LNS_RECORD_VALUE)
    async generateSetLnsRecordValue(request: TransactionMaker.Transaction.SetLnsRecordValueTransactionParams) {
        this.__verifier.verify(request, TR_SET_LNS_RECORD_VALUE);
        const operationType = request.operationType as number;
        const tr = await mySetLnsRecordValue.generateSetLnsRecordValue(
            this.__getTransactionBody(request),
            {
                sourceChainName: this.bfchainCore.config.chainName,
                sourceChainMagic: this.bfchainCore.config.magic,
                name: request.name,
                operationType,
                addRecord:
                    operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.ADD ? (request.addRecord as any) : undefined,
                deleteRecord:
                    operationType === RECORD_OPERATION_TYPE.UPDATE || operationType === RECORD_OPERATION_TYPE.DELETE
                        ? (request.deleteRecord as any)
                        : undefined,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY)
    async generateEntityFactory(request: TransactionMaker.Transaction.IssueEntityFactoryTransactionParams) {
        this.__verifier.verify(request, TR_ISSUE_ENTITY_FACTORY);
        const factoryInfo = request.factoryInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityFactory.generateEntityFactory(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                ...factoryInfo,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_FACTORY_V1)
    async generateEntityFactoryV1(
        request: TransactionMaker.Transaction.IssueEntityFactoryTransactionV1Params
    ): Promise<BFChainCore.IssueEntityFactoryTransactionV1JSON> {
        this.__verifier.verify(request, TR_ISSUE_ENTITY_FACTORY);
        const factoryInfo = request.factoryInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityFactoryV1.generateEntityFactory(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                ...factoryInfo,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY)
    async generateEntity(request: TransactionMaker.Transaction.IssueEntityTransactionParams) {
        this.__verifier.verify(request, TR_ISSUE_ENTITY);
        const { entityId, entityFactoryPossessor, entityFactory, taxAssetPrealnum } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityV1.generateEntity(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityId: `${entityFactory.factoryId}_${entityId}`,
                taxAssetPrealnum: taxAssetPrealnum || "0",
                entityFactoryPossessor,
                entityFactory: {
                    sourceChainMagic: entityFactory.sourceChainMagic || magic,
                    sourceChainName: entityFactory.sourceChainName || chainName,
                    factoryId: entityFactory.factoryId,
                    entityPrealnum: entityFactory.entityPrealnum,
                    entityFrozenAssetPrealnum: entityFactory.entityFrozenAssetPrealnum,
                    purchaseAssetPrealnum: entityFactory.purchaseAssetPrealnum,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_ISSUE_ENTITY_MULTI)
    async generateEntityMulti(request: TransactionMaker.Transaction.IssueEntityMultiTransactionParams) {
        this.__verifier.verify(request, TR_ISSUE_ENTITY_MULTI_V1);
        const { entityStructList, entityFactoryPossessor, entityFactory } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myIssueEntityMultiV1.generateEntityMulti(
            this.__getTransactionBody(request),
            {
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityStructList: entityStructList.map((item) => {
                    return {
                        entityId: `m_${entityFactory.factoryId}_${item.entityId}`,
                        taxAssetPrealnum: item.taxAssetPrealnum || "0",
                    };
                }),
                entityFactoryPossessor,
                entityFactory: {
                    sourceChainMagic: entityFactory.sourceChainMagic || magic,
                    sourceChainName: entityFactory.sourceChainName || chainName,
                    factoryId: entityFactory.factoryId,
                    entityPrealnum: entityFactory.entityPrealnum,
                    entityFrozenAssetPrealnum: entityFactory.entityFrozenAssetPrealnum,
                    purchaseAssetPrealnum: entityFactory.purchaseAssetPrealnum,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_DESTROY_ENTITY)
    async generateDestroyEntity(request: TransactionMaker.Transaction.DestroyEntityTransactionParams) {
        this.__verifier.verify(request, TR_DESTROY_ENTITY);
        const { transactionSignature, entityId, entityFactoryApplicant, entityFactoryPossessor, entityFactory } = request.entityInfo;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myDestroyEntity.generateDestroyEntity(
            this.__getTransactionBody(request),
            {
                transactionSignature,
                sourceChainMagic: magic,
                sourceChainName: chainName,
                entityId,
                entityFactoryApplicant,
                entityFactoryPossessor,
                entityFactory: {
                    sourceChainMagic: entityFactory.sourceChainMagic || magic,
                    sourceChainName: entityFactory.sourceChainName || chainName,
                    factoryId: entityFactory.factoryId,
                    entityPrealnum: entityFactory.entityPrealnum,
                    entityFrozenAssetPrealnum: entityFactory.entityFrozenAssetPrealnum,
                    purchaseAssetPrealnum: entityFactory.purchaseAssetPrealnum,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_REGISTER_CHAIN)
    async generateRegisterChain(request: TransactionMaker.Transaction.RegisterChainTransactionParams) {
        this.__verifier.verify(request, TR_REGISTER_CHAIN);
        const tr = await myRegisterChain.generateRegisterChain(
            this.__getTransactionBody(request),
            this.__getAccountPowInfo(request),
            this.bfchainCore.registerChainCertificateHelper.encode(request.registerCertificate as any),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_EMIGRATE_ASSET)
    async generateEmigrateAsset(request: TransactionMaker.Transaction.EmigrateAssetTransactionParams) {
        this.__verifier.verify(request, TR_EMIGRATE_ASSET);
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificate = request.migrateCertificate;
        await bfchainCore.migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromAuthSignature: true,
            forceCheckFromChainInfo: true,
            fromChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisDelegates: bfchainCore.transactionHelper.genesisDelegates(config),
            },
        });
        const tr = await myEmigrateAsset.generateEmigrateAsset(
            this.__getTransactionBody(request),
            { migrateCertificate: JSON.stringify(request.migrateCertificate) },
            this.__getAccountPowInfo(request),
            bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_IMMIGRATE_ASSET)
    async generateImmigrateAsset(request: TransactionMaker.Transaction.ImmigrateAssetTransactionParams) {
        this.__verifier.verify(request, TR_IMMIGRATE_ASSET);
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificate = request.migrateCertificate;
        await bfchainCore.migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromAuthSignature: true,
            forceCheckToAuthSignature: true,
            forceCheckToChainInfo: true,
            toChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisDelegates: bfchainCore.transactionHelper.genesisDelegates(config),
            },
        });
        const tr = await myImmigrateAsset.generateImmigrateAsset(
            this.__getTransactionBody(request),
            { migrateCertificate: JSON.stringify(migrateCertificate) },
            this.__getAccountPowInfo(request),
            bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TRANSFER_ANY)
    async generateTransferAny(request: TransactionMaker.Transaction.TransferAnyTransactionParams) {
        this.__verifier.verify(request, TR_TRANSFER_ANY);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;
        const transferAny: BFChainCore.TransferAnyJSON = {
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: assetInfo.parentAssetType as number,
            assetType: assetInfo.assetType,
            amount: assetInfo.amount,
            taxInformation: request.taxInformation,
        };
        const tr = await myTransferAny.generateTransferAny(
            this.__getTransactionBody(request),
            transferAny,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_GIFT_ANY)
    async generateGiftAny(request: TransactionMaker.Transaction.GiftAnyTransactionParams) {
        this.__verifier.verify(request, TR_GIFT_ANY);
        const assetInfo = request.assetInfo;
        const config = this.bfchainCore.config;

        const giftAny: BFChainCore.GiftAnyJSON = {
            cipherPublicKeys: [],
            sourceChainMagic: assetInfo.sourceChainMagic || config.magic,
            sourceChainName: assetInfo.sourceChainName || config.chainName,
            parentAssetType: assetInfo.parentAssetType as number,
            assetType: assetInfo.assetType,
            amount: assetInfo.amount,
            giftDistributionRule: request.giftDistributionRule as number,
            totalGrabableTimes: request.totalGrabableTimes || 1,
            taxInformation: request.taxInformation,
        };
        const tr = await myGiftAny.generateGiftAny(
            this.__getTransactionBody(request),
            giftAny,
            request.ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_GRAB_ANY)
    async generateGrabAny(request: TransactionMaker.Transaction.GrabAnyTransactionParams) {
        this.__verifier.verify(request, TR_GRAB_ANY);
        const config = this.bfchainCore.config;
        const giftAny = request.giftAny;
        const tr = await myGrabAny.generateGrabAny(
            this.__getTransactionBody(request),
            {
                blockSignature: request.blockSignature,
                transactionSignature: request.transactionSignature,
                amount: request.amount,
                giftAny: {
                    cipherPublicKeys: giftAny.cipherPublicKeys,
                    sourceChainMagic: giftAny.sourceChainMagic || config.magic,
                    sourceChainName: giftAny.sourceChainName || config.chainName,
                    parentAssetType: giftAny.parentAssetType as number,
                    assetType: giftAny.assetType,
                    amount: giftAny.amount,
                    beginUnfrozenBlockHeight: giftAny.beginUnfrozenBlockHeight,
                    giftDistributionRule: giftAny.giftDistributionRule,
                    totalGrabableTimes: giftAny.totalGrabableTimes,
                    taxInformation: giftAny.taxInformation,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY)
    async generateToExchangeAny(request: TransactionMaker.Transaction.ToExchangeAnyTransactionParams) {
        this.__verifier.verify(request, TR_TO_EXCHANGE_ANY);
        const { toExchangeInfo, beExchangeInfo, assetExchangeWeightRatio, ciphertexts, taxInformation } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const tr = await myToExchangeAny.generateToExchangeAny(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                assetExchangeWeightRatio: assetExchangeWeightRatio,
                taxInformation,
            },
            ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY)
    async generateBeExchangeAny(request: TransactionMaker.Transaction.BeExchangeAnyTransactionParams) {
        this.__verifier.verify(request, TR_BE_EXCHANGE_ANY);
        const { magic, chainName } = this.bfchainCore.config;
        const exchangeAny = request.exchangeAny;
        const tr = await myBeExchangeAny.generateBeExchangeAny(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssetPrealnum: request.toExchangeAssetPrealnum,
                beExchangeAssetPrealnum: request.beExchangeAssetPrealnum,
                taxInformation: request.taxInformation,
                exchangeAny: {
                    cipherPublicKeys: exchangeAny.cipherPublicKeys,
                    toExchangeSource: exchangeAny.toExchangeSource || magic,
                    beExchangeSource: exchangeAny.beExchangeSource || magic,
                    toExchangeChainName: exchangeAny.toExchangeChainName || chainName,
                    beExchangeChainName: exchangeAny.beExchangeChainName || chainName,
                    toExchangeParentAssetType: exchangeAny.toExchangeParentAssetType as number,
                    beExchangeParentAssetType: exchangeAny.beExchangeParentAssetType as number,
                    toExchangeAssetType: exchangeAny.toExchangeAssetType,
                    beExchangeAssetType: exchangeAny.beExchangeAssetType,
                    toExchangeAssetPrealnum: exchangeAny.toExchangeAssetPrealnum,
                    beExchangeAssetPrealnum: exchangeAny.beExchangeAssetPrealnum,
                    assetExchangeWeightRatio: exchangeAny.assetExchangeWeightRatio,
                    taxInformation: exchangeAny.taxInformation,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            request.ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI)
    async generateToExchangeAnyMulti(request: TransactionMaker.Transaction.ToExchangeAnyMultiTransactionParams) {
        this.__verifier.verify(request, TR_TO_EXCHANGE_ANY_MULTI);
        const { toExchangeInfos, beExchangeInfo, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const toExchangeAssets: BFChainCore.ToExchangeAssetV1JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                assetExchangeWeightRatio: toExchangeInfo.assetExchangeWeightRatio,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }
        const tr = await myToExchangeAnyMulti.generateToExchangeAnyMulti(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeAssets,
                beExchangeAsset: {
                    beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                    beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                    beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                    beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                    beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                    taxInformation: beExchangeInfo.taxInformation,
                },
            },
            ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI)
    async generateBeExchangeAnyMulti(request: TransactionMaker.Transaction.BeExchangeAnyMultiTransactionParams) {
        this.__verifier.verify(request, TR_BE_EXCHANGE_ANY_MULTI);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfos, beExchangeInfo, ciphertext } = request;
        const toExchangeAssets: BFChainCore.ToExchangeAssetV1JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                assetExchangeWeightRatio: toExchangeInfo.assetExchangeWeightRatio,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }
        const tr = await myBeExchangeAnyMulti.generateBeExchangeAnyMulti(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssets,
                beExchangeAsset: {
                    beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                    beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                    beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                    beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                    beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                    taxInformation: beExchangeInfo.taxInformation,
                },
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_TO_EXCHANGE_ANY_MULTI_ALL)
    async generateToExchangeAnyMultiAll(request: TransactionMaker.Transaction.ToExchangeAnyMultiAllTransactionParams) {
        this.__verifier.verify(request, TR_TO_EXCHANGE_ANY_MULTI_ALL);
        const { toExchangeInfos, beExchangeInfos, ciphertexts } = request;
        const { magic, chainName } = this.bfchainCore.config;
        const toExchangeAssets: BFChainCore.ToExchangeAssetV2JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }
        const beExchangeAssets: BFChainCore.BeExchangeAssetV2JSON[] = [];
        for (const beExchangeInfo of beExchangeInfos) {
            beExchangeAssets.push({
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                taxInformation: beExchangeInfo.taxInformation,
            });
        }
        const tr = await myToExchangeAnyMultiAll.generateToExchangeAnyMultiAll(
            this.__getTransactionBody(request),
            {
                cipherPublicKeys: [],
                toExchangeAssets,
                beExchangeAssets,
            },
            ciphertexts,
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_BE_EXCHANGE_ANY_MULTI_ALL)
    async generateBeExchangeAnyMultiAll(request: TransactionMaker.Transaction.BeExchangeAnyMultiAllTransactionParams) {
        this.__verifier.verify(request, TR_BE_EXCHANGE_ANY_MULTI_ALL);
        const { magic, chainName } = this.bfchainCore.config;
        const { toExchangeInfos, beExchangeInfos, ciphertext } = request;
        const toExchangeAssets: BFChainCore.ToExchangeAssetV2JSON[] = [];
        for (const toExchangeInfo of toExchangeInfos) {
            toExchangeAssets.push({
                toExchangeSource: toExchangeInfo.toExchangeSource || magic,
                toExchangeChainName: toExchangeInfo.toExchangeChainName || chainName,
                toExchangeParentAssetType: toExchangeInfo.toExchangeParentAssetType as number,
                toExchangeAssetType: toExchangeInfo.toExchangeAssetType,
                toExchangeAssetPrealnum: toExchangeInfo.toExchangeAssetPrealnum,
                taxInformation: toExchangeInfo.taxInformation,
            });
        }
        const beExchangeAssets: BFChainCore.BeExchangeAssetV2JSON[] = [];
        for (const beExchangeInfo of beExchangeInfos) {
            beExchangeAssets.push({
                beExchangeSource: beExchangeInfo.beExchangeSource || magic,
                beExchangeChainName: beExchangeInfo.beExchangeChainName || chainName,
                beExchangeParentAssetType: beExchangeInfo.beExchangeParentAssetType as number,
                beExchangeAssetType: beExchangeInfo.beExchangeAssetType,
                beExchangeAssetPrealnum: beExchangeInfo.beExchangeAssetPrealnum,
                taxInformation: beExchangeInfo.taxInformation,
            });
        }
        const tr = await myBeExchangeAnyMultiAll.generateBeExchangeAnyMultiAll(
            this.__getTransactionBody(request),
            {
                transactionSignature: request.transactionSignature,
                toExchangeAssets,
                beExchangeAssets,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore,
            ciphertext
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_MACRO)
    async generateMacro(request: TransactionMaker.Transaction.MacroTransactionParams) {
        // FIXME
        // this.__verifier.verify(request);
        const tr = await myMacro.generateMacro(
            this.__getTransactionBody(request),
            {
                inputs: request.inputs as any,
                template: request.template,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_MACRO_CALL)
    async generateMacroCall(request: TransactionMaker.Transaction.MacroCallTransactionParams) {
        // FIXME
        // this.__verifier.verify(request);
        const tr = await myMacroCall.generateMacroCall(
            this.__getTransactionBody(request),
            {
                inputs: request.inputs,
                macroId: request.macroId,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_PROMISE)
    async generatePromise(request: TransactionMaker.Transaction.PromiseTransactionParams) {
        // FIXME
        // this.__verifier.verify(request);
        const tr = await myPromise.generatePromise(
            this.__getTransactionBody(request),
            {
                transaction: request.transaction,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_PROMISE_RESOLVE)
    async generatePromiseResolve(request: TransactionMaker.Transaction.PromiseResolveTransactionParams) {
        // FIXME
        // this.__verifier.verify(request);
        const tr = await myPromiseResolve.generatePromiseResolve(
            this.__getTransactionBody(request),
            {
                promiseId: request.promiseId,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }

    @Route(GENERATE_TRANSACTION_API_PATH.TR_MULTIPLE)
    async generateMultiple(request: TransactionMaker.Transaction.MultipleTransactionParams) {
        // FIXME
        // this.__verifier.verify(request);
        const tr = await myMultiple.generateMultiple(
            this.__getTransactionBody(request),
            {
                transactions: request.transactions,
            },
            this.__getAccountPowInfo(request),
            this.bfchainCore
        );
        return tr.toJSON();
    }
}
