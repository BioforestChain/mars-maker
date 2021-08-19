import { BasicPostApi } from "./_basicPostApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare class GetAccountPublicKeyApi extends BasicPostApi<BFChainPcSdk.Basic.GetAccountPublicKeyResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_ACCOUNT_PUBLICKEY;
    sendPostRequest(argv: BFChainPcSdk.Basic.GetAccountPublicKeyParams): Promise<BFChainPcSdk.Basic.BasicApiReturn<BFChainPcSdk.Basic.GetAccountPublicKeyResult>>;
}
