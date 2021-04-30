import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetSystemMonitorApi extends SystemPostApi<BFChainPcSdk.System.GetSystemMonitorResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_SYSTEM_MONITOR;

    async sendPostRequest(argv: BFChainPcSdk.System.GetSystemMonitorParams) {
        return await super.sendPostRequest(argv);
    }
}
