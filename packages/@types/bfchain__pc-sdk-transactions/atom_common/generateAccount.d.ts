import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class GenerateAccountFactory extends CommonFactory<BFChainPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;
    exec(request: BFChainPcSdk.Common.GenerateAccountParams): Promise<BFChainPcSdk.Common.AccountInfo>;
}
