import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateAddressByPublicKeyFactory extends CommonFactory<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_ADDRESS_BY_PUBLICKEY;

    async exec(request: TransactionMaker.Common.GenerateAddressByPublicKeyParams) {
        const address = await this.bfchainCore.accountBaseHelper.getAddressFromPublicKeyString(request.publicKey);
        return address;
    }
}
