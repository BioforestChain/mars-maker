import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class MiningMachineInfoApi extends SystemPostApi<BFMetaPcSdk.System.MiningMachineInfoResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_MINING_MACHINE_INFO;
    sendPostRequest(argv: BFMetaPcSdk.System.MiningMachineInfoParams): Promise<BFMetaPcSdk.System.SystemApiReturn<BFMetaPcSdk.System.MiningMachineInfoResult>>;
}
