import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetTransactionsApi extends BasicPostApi<BFChainPcSdk.Basic.GetTransactionsResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_TRANSACTIONS;
    sendPostRequest(argv: BFChainPcSdk.Basic.GetTransactionsParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetTransactionsResult>>;
}
