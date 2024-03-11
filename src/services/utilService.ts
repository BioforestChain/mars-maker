import { NewTransactionStatus, RESPONSE_STATUS, MacroCallTransactionFactory } from "@bfchain/core";
import { Aborter, I18N_LANGUAGE_TYPE, Injectable, Inject } from "@bfchain/util";
import { UTIL_API_PATH } from "@bfmeta/transaction-maker-typings";
import { BlobHelper } from "../blobHelper";
import { ChainCore } from "../chainCore";
import { Config } from "../config";
import { INJECT_MODULE } from "../constants";
import { Route } from "../decorators";
import { ERROR_LIST, TransactionMakerExceptionGenerator } from "../exception";
const { ArgumentIllegalException, ArgumentException } = TransactionMakerExceptionGenerator("TransactionMaker", "UtilService");

@Injectable()
export class UtilService {
    @Inject(INJECT_MODULE.CONFIG)
    private __config!: Config;
    @Inject(INJECT_MODULE.CHAIN_CORE)
    private __chainCore!: ChainCore;
    constructor(private __blobHelper: BlobHelper) {}

    @Route(UTIL_API_PATH.MACRO_BUILD)
    async macroBuildTransaction(request: TransactionMaker.Transaction.MacroBuildTransactionParams) {
        const { template, defineInputs, inputs } = request;
        const { bfchainCore } = this.__chainCore;
        const templateTransaction = await bfchainCore.transaction.recombineTransaction(template);
        const factory = bfchainCore.transaction.getTransactionFactoryFromType(bfchainCore.transactionHelper.MACRO_CALL) as MacroCallTransactionFactory;
        const macroCallTransaction = await factory.generateTransaction(templateTransaction, defineInputs as any, inputs);
        return macroCallTransaction.toJSON();
    }

    @Route(UTIL_API_PATH.RECOMBINE)
    async recombineTransaction(request: TransactionMaker.Transaction.RecombineTransactionParams) {
        const { secret, secondSecretInfo, transaction } = request;
        const { bfchainCore } = this.__chainCore;
        const trs = await bfchainCore.transaction.recombineTransaction(transaction);
        if (secret) {
            const keypair = await bfchainCore.accountBaseHelper.createSecretKeypair(secret);
            trs.signatureBuffer = await bfchainCore.asymmetricHelper.detachedSign(trs.getBytes(true, true), keypair.secretKey);
            if (secondSecretInfo) {
                const secondKeypair = await bfchainCore.accountBaseHelper.createSecondSecretKeypairV2(secret, secondSecretInfo.secondSecret);
                trs.signSignatureBuffer = await bfchainCore.asymmetricHelper.detachedSign(trs.getBytes(false, true), secondKeypair.secretKey);
            }
        }
        return trs.toJSON();
    }

    private __getStatus(status: RESPONSE_STATUS) {
        const SYSTEM_LANGUAGE = this.__chainCore.SYSTEM_LANGUAGE;
        if (SYSTEM_LANGUAGE === I18N_LANGUAGE_TYPE.CHINESE) {
            if (status === RESPONSE_STATUS.error) {
                return "错误";
            }
            if (status === RESPONSE_STATUS.busy) {
                return "节点繁忙";
            }
            if (status === RESPONSE_STATUS.idempotentError) {
                return "幂等错误";
            }
            if (status === RESPONSE_STATUS.success) {
                return "成功";
            }
            return "未知状态";
        }
        if (status === RESPONSE_STATUS.error) {
            return "error";
        }
        if (status === RESPONSE_STATUS.busy) {
            return "busy";
        }
        if (status === RESPONSE_STATUS.idempotentError) {
            return "idempotent error ";
        }
        if (status === RESPONSE_STATUS.success) {
            return "success";
        }
        return "unknown";
    }

    private __getNewTrsStatus(newTrsStatus: NewTransactionStatus) {
        const SYSTEM_LANGUAGE = this.__chainCore.SYSTEM_LANGUAGE;
        if (SYSTEM_LANGUAGE === I18N_LANGUAGE_TYPE.CHINESE) {
            if (newTrsStatus === NewTransactionStatus.InBlock) {
                return "已上链";
            }
            if (newTrsStatus === NewTransactionStatus.InUnconfirmQuene) {
                return "已在未处理交易池";
            }
            if (newTrsStatus === NewTransactionStatus.Refuse) {
                return "拒绝接收";
            }
            return "未知状态";
        }
        if (newTrsStatus === NewTransactionStatus.InBlock) {
            return "in block";
        }
        if (newTrsStatus === NewTransactionStatus.InUnconfirmQuene) {
            return "in unconfirm quene";
        }
        if (newTrsStatus === NewTransactionStatus.Refuse) {
            return "refuse to accept";
        }
        return "unknown";
    }

    @Route(UTIL_API_PATH.BROADCAST)
    async broadcastTransaction(argv: TransactionMaker.Transaction.BroadcastTransactionParams) {
        if (!argv.transaction) {
            throw new ArgumentIllegalException(ERROR_LIST.PROP_IS_REQUIRE, {
                prop: "transaction",
                target: "request",
            });
        }
        const { transaction, ip } = argv;
        const { chainNodeIps, broadcastTimeout } = this.__config.config;
        const bfchainCore = this.__chainCore.bfchainCore;
        const port = bfchainCore.config.ports.port;
        const url = this.__chainCore.getUrl(ip || chainNodeIps[Math.floor(Math.random() * chainNodeIps.length)], port, bfchainCore);
        const aborter = new Aborter();
        setTimeout(() => {
            aborter.abort(`broadcastTransaction ${transaction.signature} timeout`);
        }, broadcastTimeout);
        const duplexHandler = await this.__chainCore.getDuplexHandler(url, aborter, broadcastTimeout, bfchainCore);
        const resp = await aborter.wrapAsync(duplexHandler.broadcastTransaction(transaction));
        const result: TransactionMaker.Server.BroadcastTransactionResponse = {
            signature: transaction.signature,
            status: this.__getStatus(resp.status),
            newTrsStatus: this.__getNewTrsStatus(resp.newTrsStatus),
            minFee: resp.minFee,
        };
        if (resp.errorCode) {
            resp.errorCode !== undefined && (result.errorCode = resp.errorCode);
            resp.errorMessage !== undefined && (result.errorMessage = resp.errorMessage as any);
            resp.refuseReason !== undefined && (result.refuseReason = resp.refuseReason as any);
            throw result;
        }
        return result;
    }

    /**
     * 更改blob存储区域
     * @param param0
     * @returns
     */
    @Route(UTIL_API_PATH.CHANGE_BLOBS_PATH)
    async changeBlobsPath({ blobHashArray, height }: TransactionMaker.Transaction.ChangeBlobsPathParams) {
        return await this.__blobHelper.changeBlobsPath(blobHashArray, height);
    }
}
