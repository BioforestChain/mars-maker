import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SafetyCloseApi extends SystemPostApi<BFChainPcSdk.System.SafetyCloseResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_SAFETY_CLOSE;

    async sendPostRequest(argv: BFChainPcSdk.System.SafetyCloseParams) {
        return await super.sendPostRequest(argv);
    }
}
