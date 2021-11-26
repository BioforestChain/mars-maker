import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class AsymmetricEncryptFactory extends CommonFactory<BFChainPcSdk.Common.AsymmetricEncrypt> {
    readonly EXEC_API_PATH = COMMON_API_PATH.ASYMMETRIC_ENCRYPT;
    exec(request: BFChainPcSdk.Common.AsymmetricEncryptParams): Promise<{
        nonce: string;
        encryptedMessage: string;
    }>;
}
