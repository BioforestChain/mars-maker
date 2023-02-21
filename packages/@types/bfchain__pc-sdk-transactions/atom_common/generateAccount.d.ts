import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";
export declare class GenerateAccountFactory extends CommonFactory<BFMetaPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;
    exec(request: BFMetaPcSdk.Common.GenerateAccountParams): Promise<BFMetaPcSdk.Common.AccountInfo>;
}
