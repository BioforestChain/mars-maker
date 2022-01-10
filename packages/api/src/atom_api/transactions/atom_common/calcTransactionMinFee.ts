import { CommonApi } from "./_commonApi";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class CalcTransactionMinFeeApi extends CommonApi<BFChainPcSdk.Common.TransactionMinFee> {
    readonly EXEC_API_PATH = COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE;

    async sendPostRequest(argv: BFChainPcSdk.Common.CalcTransactionMinFeeParams) {
        return super.sendPostRequest(argv);
    }
}
