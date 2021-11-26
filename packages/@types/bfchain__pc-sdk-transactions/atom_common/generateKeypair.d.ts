import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class GenerateKeypairFactory extends CommonFactory<BFChainPcSdk.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;
    exec(request: BFChainPcSdk.Common.GenerateKeypairParams): Promise<BFChainPcSdk.Common.Keypairs>;
}
