import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetEmailAddressApi extends SystemPostApi<BFMetaPcSdk.System.SetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_EMAIL_ADDRESS;
    sendPostRequest(argv: BFMetaPcSdk.System.SetEmailAddressParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.SetEmailAddressResult>>;
}
