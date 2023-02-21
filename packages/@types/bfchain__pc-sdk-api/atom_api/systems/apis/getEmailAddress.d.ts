import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetEmailAddressApi extends SystemPostApi<BFMetaPcSdk.System.GetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_EMAIL_ADDRESS;
    sendPostRequest(argv: BFMetaPcSdk.System.GetEmailAddressParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.GetEmailAddressResult>>;
}
