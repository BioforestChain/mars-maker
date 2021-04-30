import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SetEmailAddressApi extends SystemPostApi<BFChainPcSdk.System.SetEmailAddressResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SET_EMAIL_ADDRESS;

    async sendPostRequest(argv: BFChainPcSdk.System.SetEmailAddressParams) {
        return await super.sendPostRequest(argv);
    }
}
