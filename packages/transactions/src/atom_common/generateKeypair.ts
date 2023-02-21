import { Injectable, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateKeypairFactory extends CommonFactory<BFMetaPcSdk.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;

    async exec(request: BFMetaPcSdk.Common.GenerateKeypairParams) {
        const { secret, secondSecret } = request;
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(secret);
        const keypairs: BFMetaPcSdk.Common.Keypairs = {
            keypair: {
                secretKey: getHexFromArrayBuffer(keypair.secretKey),
                publicKey: getHexFromArrayBuffer(keypair.publicKey),
            },
        };
        if (secondSecret) {
            const secondKeypair = await accountBaseHelper.createSecondSecretKeypairV2(secret, secondSecret);
            keypairs.secondKeypair = {
                secretKey: getHexFromArrayBuffer(secondKeypair.secretKey),
                publicKey: getHexFromArrayBuffer(secondKeypair.publicKey),
            };
        }
        return keypairs;
    }
}
