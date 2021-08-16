import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class CreateAccountApi extends BasicPostApi<BFChainPcSdk.Basic.CreateAccountResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_CREATE_ACCOUNT;
    sendPostRequest(argv: BFChainPcSdk.Basic.CreateAccountParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.CreateAccountResult>>;
}
