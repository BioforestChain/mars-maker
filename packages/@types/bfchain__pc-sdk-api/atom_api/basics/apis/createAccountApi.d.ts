import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class CreateAccountApi extends BasicPostApi<BFMetaPcSdk.Basic.CreateAccountResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_CREATE_ACCOUNT;
    sendPostRequest(argv: BFMetaPcSdk.Basic.CreateAccountParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.CreateAccountResult>>;
}
