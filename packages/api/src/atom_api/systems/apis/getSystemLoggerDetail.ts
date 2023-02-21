import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemLoggerDetailApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemLoggerDetailResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_DETAIL;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetSystemLoggerDetailParams) {
        return await super.sendPostRequest(argv);
    }
}
