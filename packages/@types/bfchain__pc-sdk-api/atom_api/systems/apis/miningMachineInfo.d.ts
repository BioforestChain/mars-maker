import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class MiningMachineInfoApi extends SystemPostApi<BFChainPcSdk.System.MiningMachineInfoResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_MINING_MACHINE_INFO;
    sendPostRequest(
        argv: BFChainPcSdk.System.MiningMachineInfoParams
    ): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.MiningMachineInfoResult>>;
}
