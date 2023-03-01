import { UtilExceptionGenerator } from "@bfchain/util-exception";

export function TransactionMakerExceptionGenerator(MODULE: string, FILE: string) {
    return UtilExceptionGenerator(MODULE, FILE, {
        errorCodeMap: new Map(),
        businessName: "TransactionMaker",
    });
}
