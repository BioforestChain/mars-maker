import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateAddressBySecretFactory extends CommonFactory<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ADDRESS_BY_SECRET;

    async exec(request: BFChainPcSdk.Common.GenerateAddressBySecretParams) {
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(request.secret);
        const address = await accountBaseHelper.getAddressFromPublicKey(keypair.publicKey);
        return address;
    }
}
