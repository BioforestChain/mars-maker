import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetEmailAddressApi extends SystemPostApi<BFChainPcSdk.System.GetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_EMAIL_ADDRESS;

    async sendPostRequest(argv: BFChainPcSdk.System.GetEmailAddressParams) {
        return await super.sendPostRequest(argv);
    }
}
