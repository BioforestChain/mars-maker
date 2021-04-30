import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class AddSystemAdminApi extends SystemPostApi<BFChainPcSdk.System.AddSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_ADD_SYSTEM_ADMIN;

    async sendPostRequest(argv: BFChainPcSdk.System.AddSystemAdminParams) {
        return await super.sendPostRequest(argv);
    }
}
