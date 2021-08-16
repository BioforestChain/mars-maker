import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetTransactionTypeApi extends BasicPostApi<BFChainPcSdk.Basic.GetTransactionTypeResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_TRANSACTION_TYPE;
    sendPostRequest(argv: BFChainPcSdk.Basic.GetTransactionTypeParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetTransactionTypeResult>>;
}
