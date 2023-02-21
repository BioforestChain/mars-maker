import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class VerifySystemSecretApi extends SystemPostApi<BFMetaPcSdk.System.VerifySystemSecretResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_SECRET;

    async sendPostRequest(argv: BFMetaPcSdk.System.VerifySystemSecretParams) {
        return await super.sendPostRequest(argv);
    }
}
