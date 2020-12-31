import { Injectable } from "@bfchain/util";
import { PcSDKExceptionGenerator } from "../helpers/moduleError/expceptionGenerator";
const { BusinessCheckException } = PcSDKExceptionGenerator("pc-sdk:api", __filename);
import { CHAIN_API_PATH } from "../typings/enumTypes";

/**基础接口 */
@Injectable()
export class BasicApi {
    constructor() {}
}
