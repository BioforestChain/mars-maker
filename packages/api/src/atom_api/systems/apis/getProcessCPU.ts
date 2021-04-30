import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetProcessCPUApi extends SystemPostApi<BFChainPcSdk.System.GetProcessCPUResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_CPU;

    async sendPostRequest(argv: BFChainPcSdk.System.GetProcessCPUParams) {
        return await super.sendPostRequest(argv);
    }
}
