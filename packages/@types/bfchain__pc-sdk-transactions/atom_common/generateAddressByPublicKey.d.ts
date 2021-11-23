import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class GenerateAddressByPublicKeyFactory extends CommonFactory<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ADDRESS_BY_PUBLICKEY;
    exec(request: BFChainPcSdk.Common.GenerateAddressByPublicKeyParams): Promise<string>;
}
