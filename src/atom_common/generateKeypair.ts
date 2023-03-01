import { Injectable, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateKeypairFactory extends CommonFactory<TransactionMaker.Common.Keypairs> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_KEYPAIR;

    async exec(request: TransactionMaker.Common.GenerateKeypairParams) {
        const { secret, secondSecret } = request;
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(secret);
        const keypairs: TransactionMaker.Common.Keypairs = {
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
