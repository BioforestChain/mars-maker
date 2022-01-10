import { Injectable } from "@bfchain/util";
import { Transaction } from "@bfchain/core";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class CalcTransactionMinFee extends CommonFactory<BFChainPcSdk.Common.TransactionMinFee> {
    readonly EXEC_API_PATH = COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE;

    async exec(request: BFChainPcSdk.Common.CalcTransactionMinFeeParams) {
        const transaction =
            request.transaction instanceof Transaction ? request.transaction : await this.bfchainCore.transaction.recombineTransaction(request.transaction);
        const minFee = this.bfchainCore.transactionHelper.calcTransactionMinFee(transaction, undefined, request.customMinFeePerByte);

        return {
            minFee,
        };
    }
}
