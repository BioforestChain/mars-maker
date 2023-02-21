import { BasicGetApi } from "./_basicGetApi";
import { BASIC_API_PATH } from "@bfchain/pc-sdk-api-constants";

export class GetBfchainVersionApi extends BasicGetApi<BFMetaPcSdk.Basic.GetBfchainVersionResult> {
    readonly REQUEST_API_PATH = BASIC_API_PATH.BASIC_GET_BFCHAIN_VERSION;

    async sendGetRequest() {
        return await super.sendGetRequest();
    }
}
