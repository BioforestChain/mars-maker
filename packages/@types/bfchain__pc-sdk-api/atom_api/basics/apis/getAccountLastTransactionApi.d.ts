import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetAccountLastTransactionApi extends BasicPostApi<BFMetaPcSdk.Basic.GetAccountLastTransactionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_LAST_TRANSACTION;
    sendPostRequest(argv: BFMetaPcSdk.Basic.GetAccountLastTransactionParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GetAccountLastTransactionResult>>;
}
