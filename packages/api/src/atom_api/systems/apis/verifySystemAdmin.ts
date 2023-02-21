import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class VerifySystemAdminApi extends SystemPostApi<BFMetaPcSdk.System.VerifySystemAdminResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_ADMIN;

    async sendPostRequest(argv: BFMetaPcSdk.System.VerifySystemAdminParams) {
        return await super.sendPostRequest(argv);
    }
}
