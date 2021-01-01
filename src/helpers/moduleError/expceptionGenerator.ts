import { UtilExceptionGenerator, Exception, cacheObjectGetter } from "@bfchain/util-exception";
/**
 * PcSDKExceptionGenerator构造的Exception，使用时如果有i18n翻译后的message，应放在detail的message里
 *
 */
export function PcSDKExceptionGenerator(MODULE: string, FILE: string) {
    const browserException = UtilExceptionGenerator(MODULE, FILE, { errorCodeMap: new Map() });
    const { getException } = browserException;
    return Object.assign(
        browserException,
        cacheObjectGetter({
            get LackException() {
                return getException<BFChainUtil.ExceptionConstructor<BFChainPcSdk.Exception.LackException>>(
                    class LackException extends Exception {
                        static TYPE = "LackException";
                    }
                );
            },
            //业务检查错误，日志显示等级为Info
            get BusinessCheckException() {
                return getException<BFChainUtil.ExceptionConstructor<BFChainPcSdk.Exception.BusinessCheckException>>(
                    class BusinessCheckException extends Exception {
                        static TYPE = "BusinessCheckException";
                    }
                );
            },
        })
    );
}
const { ArgumentException, ArgumentIllegalException, ArgumentFormatException, ConsensusException, BusinessCheckException } = PcSDKExceptionGenerator(
    "pc-sdk:helpers",
    __filename
);
/**
 * 是否是业务逻辑错误
 *
 * @param e error对象
 * @return true|false
 */
export function isBusinessError(e: any) {
    if (!e) {
        return false;
    }
    if (
        ArgumentException.is(e) ||
        ArgumentIllegalException.is(e) ||
        ArgumentFormatException.is(e) ||
        ConsensusException.is(e) ||
        BusinessCheckException.is(e)
    ) {
        return true;
    }
    return false;
}
