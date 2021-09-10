import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DAppApi extends TransactionApi<BFChainCore.DAppTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_DAPP;

    async generateTransaction(argv: BFChainPcSdk.Transaction.DAppTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.DAppTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
