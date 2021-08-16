import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GenerateSecretApi extends BasicPostApi<BFChainPcSdk.Basic.GenerateSecretResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GENERATE_SECRET;
    sendPostRequest(argv: BFChainPcSdk.Basic.GenerateSecretParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GenerateSecretResult>>;
}
