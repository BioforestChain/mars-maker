import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetProcessNetworkApi extends SystemPostApi<BFMetaPcSdk.System.GetProcessNetworkResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_GET_PROCESS_NETWORK;

    async sendPostRequest(argv: BFMetaPcSdk.System.GetProcessNetworkParams) {
        return await super.sendPostRequest(argv);
    }
}
