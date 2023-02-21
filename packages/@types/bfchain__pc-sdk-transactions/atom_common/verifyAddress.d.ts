import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class VerifyAddressFactory extends CommonFactory<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_ADDRESS;
    exec(request: BFMetaPcSdk.Common.VerifyAddressParams): Promise<boolean>;
}
