import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class CalcTransactionMinFee extends CommonFactory<BFChainPcSdk.Common.TransactionMinFee> {
    readonly EXEC_API_PATH = COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE;
    exec(request: BFChainPcSdk.Common.CalcTransactionMinFeeParams): Promise<{
        minFee: string;
    }>;
}
