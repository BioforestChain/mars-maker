import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class VerifyPublicKeyFactory extends CommonFactory<boolean> {
    readonly EXEC_API_PATH = COMMON_API_PATH.VERIFY_PUBLICKEY;

    async exec(request: TransactionMaker.Common.VerifyPublicKeyParams) {
        const isPublicKey = this.bfchainCore.baseHelper.isValidPublicKey(request.publicKey);
        return isPublicKey;
    }
}
