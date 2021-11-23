import { Injectable, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateAccountFactory extends CommonFactory<BFChainPcSdk.Common.AccountInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ACCOUNT;

    async exec(request: BFChainPcSdk.Common.GenerateAccountParams) {
        const { secret, secondSecret } = request;
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(secret);
        const publicKey = getHexFromArrayBuffer(keypair.publicKey);
        const address = await accountBaseHelper.getAddressFromPublicKey(keypair.publicKey);
        const accountInfo: BFChainPcSdk.Common.AccountInfo = {
            address,
            publicKey,
        };
        if (secondSecret) {
            const secondKeypair = await accountBaseHelper.createSecondSecretKeypairV2(secret, secondSecret);
            accountInfo.secondPublicKey = getHexFromArrayBuffer(secondKeypair.publicKey);
        }
        return accountInfo;
    }
}
