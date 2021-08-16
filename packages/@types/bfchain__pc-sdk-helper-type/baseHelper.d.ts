export declare class BaseHelper {
    getVariableType(variable: any): string;
    isBoolean(value: any): value is boolean;
    isNaturalNumber(value: any): value is number;
    MAX_UINT_32_INTEGER: number;
    isUint32(value: any): value is number;
    MAX_INT_32_INTEGER: number;
    MIN_INT_32_INTEGER: number;
    isInt32(value: any): value is number;
    isNoEmptyUint8Array(value: any): value is Uint8Array;
    isPositiveInteger(value: any): value is number;
    isEmptyObject(e: unknown): e is object;
    isArrayEqual<T>(a: ArrayLike<T>, b: ArrayLike<T>): boolean;
    isString(str: unknown): str is string;
    isArray(arr: unknown): arr is any[];
    isObject(obj: unknown): obj is Object;
    isMakeUpWithNumber(stringNumber: string): boolean;
    isValidStringNumber(stringNumber: any): boolean;
}
