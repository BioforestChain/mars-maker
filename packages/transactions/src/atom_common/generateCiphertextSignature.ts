import { Injectable, parseHexToArrayBuffer, getHexFromArrayBuffer } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateCiphertextSignatureFactory extends CommonFactory<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_CIPHERTEXT_SIGNATURE;

    async exec(request: BFMetaPcSdk.Common.GenerateCiphertextSignatureParams) {
        return getHexFromArrayBuffer(
            await this.bfchainCore.transactionHelper.getCiphertextSignature({
                secret: request.secret,
                transactionSignatureBuffer: parseHexToArrayBuffer(request.transactionSignature),
                senderId: request.senderId,
            })
        );
    }
}
