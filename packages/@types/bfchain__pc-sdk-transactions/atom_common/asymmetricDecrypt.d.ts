import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class AsymmetricDecryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;
    exec(request: BFChainPcSdk.Common.AsymmetricDecryptParams): Promise<false | Uint8Array>;
}
