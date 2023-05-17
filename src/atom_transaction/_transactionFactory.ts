import type { BFChainCore } from "@bfchain/core";
import type { Verifier } from "../schema";
import { RANGE_TYPE } from "@bfchain/core";
import { TRANSACTION_SCHEMA_MAP } from "../schema";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";
const { ArgumentIllegalException } = TransactionMakerExceptionGenerator("Sdk", "Transactions");

export abstract class _TransactionFactory<T extends BFChainCore.Transaction> {
    abstract readonly GENERATE_API_PATH: TransactionMaker.Transaction.GENERATE_TRANSACTION_API_PATH;

    constructor(public bfchainCore: BFChainCore, private __verifier: Verifier) {}

    getTransactionBody(request: TransactionMaker.Transaction.TransactionCommonParams) {
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
            remark = this.setTransactionRemark(remark ?? {}, keys, fileInfos);
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

    getAccountPowInfo(request: TransactionMaker.Transaction.TransactionCommonParams) {
        const { accountLastRoundInfo, applyBlockHeight } = request;
        const accountPowInfo: BFChainCoreTools.AccountPowInfoModel = { round: 1, txCount: 0, equity: "0" };
        if (accountLastRoundInfo) {
            accountPowInfo.round = this.bfchainCore.blockHelper.calcRoundByHeight(applyBlockHeight) - 1;
            accountPowInfo.txCount = accountLastRoundInfo.txCount;
            accountPowInfo.equity = accountLastRoundInfo.equity;
        }
        return accountPowInfo;
    }

    verify(request: TransactionMaker.Transaction.TransactionCommonParams) {
        this.__verifier.verify(request, TRANSACTION_SCHEMA_MAP.get(this.GENERATE_API_PATH));
    }

    /**
     * 生成交易体
     *
     * @param request
     * @param accountPowInfo
     */
    abstract generateTransaction(request: TransactionMaker.Transaction.TransactionCommonParams): Promise<BFChainCore.TransactionJSON>;

    /**针对节点存储设置交易对象的remark字段 */
    setTransactionRemark(remark: { [key: string]: string }, keys: string[], fileInfos: { name: string; size: number }[]): { [key: string]: string } {
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
}
