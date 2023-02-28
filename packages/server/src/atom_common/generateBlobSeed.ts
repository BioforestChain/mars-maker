import { Injectable } from "@bfchain/util";
import { BLOB_IN_TRS_REMARK_PREFIX } from "@bfchain/core";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateBlobSeedFactory extends CommonFactory<string> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_BLOB_SEED;

    async exec(request: TransactionMaker.Common.GenerateBlobSeedParams) {
        return `${BLOB_IN_TRS_REMARK_PREFIX.SHA256}${request.hash}?size=${request.size}`;
    }
}
