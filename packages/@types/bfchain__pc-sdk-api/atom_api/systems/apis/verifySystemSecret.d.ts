import { SystemPostApi } from "./_systemPostApi";
import { SYSTEM_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class VerifySystemSecretApi extends SystemPostApi<BFChainPcSdk.System.VerifySystemSecretResult> {
    readonly REQUEST_API_PATH = SYSTEM_API_PATH.SYSTEM_VERIFY_SYSTEM_SECRET;
    sendPostRequest(argv: BFChainPcSdk.System.VerifySystemSecretParams): Promise<BFChainPcSdk.System.SystemApiReturn<BFChainPcSdk.System.VerifySystemSecretResult>>;
}
