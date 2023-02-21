import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemKeyApi extends SystemPostApi<BFMetaPcSdk.System.SetSystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_KEY;
    sendPostRequest(argv: BFMetaPcSdk.System.SetSystemKeyParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SetSystemKeyResult>>;
}
