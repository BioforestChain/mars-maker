import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class VerifyPublicKeyFactory extends CommonFactory<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_PUBLICKEY;
    exec(request: BFChainPcSdk.Common.VerifyPublicKeyParams): Promise<boolean>;
}
