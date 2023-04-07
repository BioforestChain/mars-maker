import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class TransactionMakerInfoFactory extends CommonFactory<TransactionMaker.Common.TransactionMakerInfo> {
    readonly EXEC_API_PATH = COMMON_API_PATH.TRANSACTION_MAKER_INFO;

    async exec(request: TransactionMaker.Common.CommonParams) {
        return {
            version: process.env["VERSION"] || "",
            coreVersion: process.env["CORE_VERSION"] || "",
            supportChain: this.bfchainCore.config.chainName || "",
        };
    }
}
