import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetRuntimeStateApi extends SystemPostApi<BFChainPcSdk.System.GetRuntimeStateResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_RUNTIME_STATE;

    async sendPostRequest(argv: BFChainPcSdk.System.GetRuntimeStateParams) {
        return await super.sendPostRequest(argv);
    }
}
