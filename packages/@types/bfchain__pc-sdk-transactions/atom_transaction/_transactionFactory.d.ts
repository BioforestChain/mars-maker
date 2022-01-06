import type { BFChainCore } from "@bfchain/core";
import type { TransactionVerifyHelper } from "@bfchain/pc-sdk-helper-transaction-verify";
export declare abstract class TransactionFactory<T extends BFChainCore.Transaction> {
    bfchainCore: BFChainCore;
    private __transactionVerifyHelper;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
    constructor(bfchainCore: BFChainCore, __transactionVerifyHelper: TransactionVerifyHelper);
    getTransactionBody(request: BFChainPcSdk.Transaction.TransactionCommonParams): BFChainCoreTools.MyTransactionArgv;
    getAccountPowInfo(request: BFChainPcSdk.Transaction.TransactionCommonParams): BFChainCoreTools.AccountPowInfoModel;
    verify(request: BFChainPcSdk.Transaction.TransactionCommonParams): void;
    abstract generateTransaction(request: BFChainPcSdk.Transaction.TransactionCommonParams): Promise<BFChainCore.TransactionJSON>;
    setTransactionRemark(remark: {
        [key: string]: string;
    }, keys: string[], fileInfos: {
        name: string;
        size: number;
    }[]): {
        [key: string]: string;
    };
}
