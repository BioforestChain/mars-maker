import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetEmailAddressApi extends SystemPostApi<BFChainPcSdk.System.GetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_EMAIL_ADDRESS;
    sendPostRequest(argv: BFChainPcSdk.System.GetEmailAddressParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.GetEmailAddressResult>>;
}
