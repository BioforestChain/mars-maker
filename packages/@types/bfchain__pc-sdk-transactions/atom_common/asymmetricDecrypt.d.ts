import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class AsymmetricDecryptFactory extends CommonFactory<BFMetaPcSdk.Common.AsymmetricDecrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_DECRYPT;
    exec(request: BFMetaPcSdk.Common.AsymmetricDecryptParams): Promise<string | false>;
}
