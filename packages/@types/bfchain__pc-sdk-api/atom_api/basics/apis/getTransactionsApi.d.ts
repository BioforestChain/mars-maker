import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetTransactionsApi extends BasicPostApi<BFMetaPcSdk.Basic.GetTransactionsResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_TRANSACTIONS;
    sendPostRequest(argv: BFMetaPcSdk.Basic.GetTransactionsParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetTransactionsResult>>;
}
