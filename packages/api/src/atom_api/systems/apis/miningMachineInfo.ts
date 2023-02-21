import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class MiningMachineInfoApi extends SystemPostApi<BFMetaPcSdk.System.MiningMachineInfoResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_MINING_MACHINE_INFO;

    async sendPostRequest(argv: BFMetaPcSdk.System.MiningMachineInfoParams) {
        return await super.sendPostRequest(argv);
    }
}
