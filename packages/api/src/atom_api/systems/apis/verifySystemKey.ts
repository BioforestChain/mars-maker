import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class VerifySystemKeyApi extends SystemPostApi<BFChainPcSdk.System.VerifySystemKeyResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_KEY;

    async sendPostRequest(argv: BFChainPcSdk.System.VerifySystemKeyParams) {
        return await super.sendPostRequest(argv);
    }
}
