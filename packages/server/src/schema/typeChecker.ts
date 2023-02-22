import { Injectable } from "@bfchain/util-dep-inject";

@Injectable()
export class TypeChecker {
    /**
     * 获取输入值的类型
     *
     * @param variable
     */
    getVariableType(variable: any) {
        return Object.prototype.toString.call(variable);
    }

    /**
     * 判断是否是一个 boolean 值
     *
     * @param value
     */
    isBoolean(value: any): value is boolean {
        return typeof value === "boolean";
    }

    /**
     * 判断输入值是否是非负整数
     *
     * @param value
     */
    isNaturalNumber(value: any): value is number {
        return Number.isInteger(value) && value >= 0;
    }

    /**uint32的最大数值 */
    MAX_UINT_32_INTEGER = 2 ** 32;

    /**判断输入值是否是合法的uint32数值 */
    isUint32(value: any): value is number {
        return this.isNaturalNumber(value) && value < this.MAX_UINT_32_INTEGER;
    }

    /**uint32的最大数值 */
    MAX_INT_32_INTEGER = 2 ** 31 - 1;
    /**uint32的最大数值 */
    MIN_INT_32_INTEGER = -(2 ** 31);

    /**判断输入值是否是合法的uint32数值 */
    isInt32(value: any): value is number {
        return Number.isInteger(value) && value < this.MAX_INT_32_INTEGER && value > this.MIN_INT_32_INTEGER;
    }

    /**判读是否是非空的`Uint8Array` */
    isNoEmptyUint8Array(value: any): value is Uint8Array {
        return value instanceof Uint8Array && value.length > 0;
    }

    /**
     * 判断输入值是否是正整数
     *
     * @param value
     */
    isPositiveInteger(value: any): value is number {
        return Number.isInteger(value) && value > 0;
    }

    /**
     * 判断是否为空对象
     * @param {*} e
     */
    isEmptyObject(e: unknown): e is object {
        if (!this.isObject(e)) return false;
        let t;
        for (t in e) return false;
        return true;
    }

    /**
     * 快速判断两个数组是否相等
     * @param a
     * @param b
     */
    isArrayEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 是否是一个字符串
     *
     * @param str
     */
    isString(str: unknown): str is string {
        return typeof str === "string";
    }

    /**
     * 是否是一个数组
     *
     * @param arr
     */
    isArray(arr: unknown): arr is any[] {
        return this.getVariableType(arr) === "[object Array]";
    }

    /**
     * 是否是一个对象
     *
     * @param obj
     */
    isObject(obj: unknown): obj is Object {
        return this.getVariableType(obj) === "[object Object]";
    }

    /**
     * 数字组成
     *
     * @param stringNumber
     */
    isMakeUpWithNumber(stringNumber: string) {
        return /^[0-9]+$/.test(stringNumber);
    }

    /**
     * 是否时是数字组成的字符串
     *
     * @param stringNumber
     */
    isValidStringNumber(stringNumber: any) {
        if (!this.isString(stringNumber)) {
            return false;
        }
        if (stringNumber.length > 1) {
            if (stringNumber.startsWith("0")) {
                return false;
            }
        }
        return this.isMakeUpWithNumber(stringNumber);
    }
}
