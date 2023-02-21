import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemLoggerListApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemLoggerListResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_LIST;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetSystemLoggerListParams) {
        return await super.sendPostRequest(argv);
    }
}
