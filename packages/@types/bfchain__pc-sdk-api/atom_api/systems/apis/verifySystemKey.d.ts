import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VerifySystemKeyApi extends SystemPostApi<BFMetaPcSdk.System.VerifySystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_KEY;
    sendPostRequest(argv: BFMetaPcSdk.System.VerifySystemKeyParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.VerifySystemKeyResult>>;
}
