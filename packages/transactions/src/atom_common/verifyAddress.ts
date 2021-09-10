import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class VerifyAddressFactory extends CommonFactory<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_ADDRESS;

    async exec(request: BFChainPcSdk.Common.VerifyAddressParams) {
        const isAddress = await this.bfchainCore.accountBaseHelper.isAddress(request.address);
        return isAddress;
    }
}
