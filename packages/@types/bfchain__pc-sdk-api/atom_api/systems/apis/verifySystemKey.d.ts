import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VerifySystemKeyApi extends SystemPostApi<BFChainPcSdk.System.VerifySystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_KEY;
    sendPostRequest(argv: BFChainPcSdk.System.VerifySystemKeyParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.VerifySystemKeyResult>>;
}
