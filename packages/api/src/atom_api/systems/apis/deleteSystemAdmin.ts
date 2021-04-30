import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class DeleteSystemAdminApi extends SystemPostApi<BFChainPcSdk.System.DeleteSystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_DELETE_SYSTEM_ADMIN;

    async sendPostRequest(argv: BFChainPcSdk.System.DeleteSystemAdminParams) {
        return await super.sendPostRequest(argv);
    }
}
