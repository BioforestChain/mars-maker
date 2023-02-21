import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateSecretApi extends BasicPostApi<BFMetaPcSdk.Basic.GenerateSecretResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GENERATE_SECRET;
    sendPostRequest(argv: BFMetaPcSdk.Basic.GenerateSecretParams): Promise<BFMetaPcSdk.Basic.BasicApiReturn<BFMetaPcSdk.Basic.GenerateSecretResult>>;
}
