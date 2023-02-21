import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SystemProcessApi extends SystemPostApi<BFMetaPcSdk.System.SystemProcessResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_PROCESS;

    async sendPostRequest(argv: BFMetaPcSdk.System.SystemProcessParams) {
        return await super.sendPostRequest(argv);
    }
}
