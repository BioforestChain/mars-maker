import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetSystemConfigApi extends SystemPostApi<BFMetaPcSdk.System.SetSystemConfigResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_SYSTEM_CONFIG;
    sendPostRequest(argv: BFMetaPcSdk.System.SetSystemConfigParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SetSystemConfigResult>>;
}
