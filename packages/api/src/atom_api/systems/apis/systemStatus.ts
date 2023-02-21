import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class SystemStatusApi extends SystemPostApi<BFMetaPcSdk.System.SystemStatusResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_STATUS;

    async sendPostRequest(argv: BFMetaPcSdk.System.SystemStatusParams) {
        return await super.sendPostRequest(argv);
    }
}
