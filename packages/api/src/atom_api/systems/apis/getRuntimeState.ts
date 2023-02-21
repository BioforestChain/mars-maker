import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetRuntimeStateApi extends SystemPostApi<BFMetaPcSdk.System.GetRuntimeStateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_RUNTIME_STATE;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetRuntimeStateParams) {
        return await super.sendPostRequest(argv);
    }
}
