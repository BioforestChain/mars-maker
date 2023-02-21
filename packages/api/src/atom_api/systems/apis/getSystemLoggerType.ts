import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemLoggerTypeApi extends SystemPostApi<BFMetaPcSdk.System.GetSystemLoggerTypeResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_LOGGER_TYPE;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetSystemLoggerTypeParams) {
        return await super.sendPostRequest(argv);
    }
}
