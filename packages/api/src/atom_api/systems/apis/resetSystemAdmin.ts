import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class ResetSystemAdminApi extends SystemPostApi<BFChainPcSdk.System.ResetSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_RESET_SYSTEM_ADMIN;

    async sendPostRequest(argv: BFChainPcSdk.System.ResetSystemAdminParams) {
        return await super.sendPostRequest(argv);
    }
}
