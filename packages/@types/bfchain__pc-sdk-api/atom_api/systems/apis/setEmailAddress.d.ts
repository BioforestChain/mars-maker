import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class SetEmailAddressApi extends SystemPostApi<BFChainPcSdk.System.SetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_EMAIL_ADDRESS;
    sendPostRequest(argv: BFChainPcSdk.System.SetEmailAddressParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.SetEmailAddressResult>>;
}
