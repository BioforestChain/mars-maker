import { PcSDKExceptionGenerator } from "../moduleError/expceptionGenerator";
// import { logger } from "../../baseHelpers/logger";
const { ArgumentIllegalException, ArgumentFormatException, BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:utils", __filename);

export class BaseUtils {
    constructor() {}
}

export const baseUtils = new BaseUtils();
