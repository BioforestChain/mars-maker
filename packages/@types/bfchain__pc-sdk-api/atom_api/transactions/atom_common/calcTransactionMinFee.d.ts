import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class CalcTransactionMinFeeApi extends CommonApi<BFChainPcSdk.Common.TransactionMinFee> {
    readonly EXEC_API_PATH = COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE;
    sendPostRequest(argv: BFChainPcSdk.Common.CalcTransactionMinFeeParams): Promise<BFChainPcSdk.TransactionServer.CommonFailureReturn | BFChainPcSdk.TransactionServer.CommonSuccessReturn<BFChainPcSdk.Common.TransactionMinFee>>;
}
