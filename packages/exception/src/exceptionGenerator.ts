import { errorCode } from "@bfchain/pc-sdk-exception-errorcode";
import { UtilExceptionGenerator } from "@bfchain/util-exception";

export function SdkExceptionGenerator(MODULE: string, FILE: string) {
    return UtilExceptionGenerator(MODULE, FILE, {
        errorCodeMap: errorCode,
        businessName: "sdk",
    });
}
