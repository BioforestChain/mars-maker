import { TransactionApi } from "./_transactionApi";
import { GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SignatureApi extends TransactionApi<BFChainCore.SignatureTransactionJSON> {
    readonly GENERATE_API_PATH = GENERATE_TRANSACTION_API_PATH.TR_SIGNATURE;

    async generateTransaction(argv: BFChainPcSdk.Transaction.SignatureTransactionParams) {
        return await super.generateTransaction(argv);
    }

    async broadcastTransaction(transaction: BFChainCore.SignatureTransactionJSON) {
        return await super.broadcastTransaction(transaction);
    }
}
