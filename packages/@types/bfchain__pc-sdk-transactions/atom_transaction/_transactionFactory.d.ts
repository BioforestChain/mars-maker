import { BFChainCore } from "@bfchain/core";
export declare abstract class TransactionFactory<T extends BFChainCore.Transaction> {
    bfchainCore: BFChainCore;
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.Transaction.GENERATE_TRANSACTION_API_PATH;
    private __transactionVerifyHelper;
    constructor(bfchainCore: BFChainCore);
    getTransactionBody(request: BFChainPcSdk.Transaction.TransactionCommonParams): BFChainCoreTools.MyTransactionArgv;
    getAccountPowInfo(request: BFChainPcSdk.Transaction.TransactionCommonParams): BFChainCoreTools.AccountPowInfoModel;
    verify(request: BFChainPcSdk.Transaction.TransactionCommonParams): void;
    abstract generateTransaction(request: BFChainPcSdk.Transaction.TransactionCommonParams): Promise<BFChainCore.TransactionJSON>;
}
