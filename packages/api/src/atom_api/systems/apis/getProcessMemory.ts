import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetProcessMemoryApi extends SystemPostApi<BFMetaPcSdk.System.GetProcessMemoryResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_MEMORY;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetProcessMemoryParams) {
        return await super.sendPostRequest(argv);
    }
}
