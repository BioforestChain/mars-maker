import { Injectable } from "@bfchain/util";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";
import { TypeChecker } from "./typeChecker";
import { BASE_ARGS_TYPE } from "./atom_schema/constants";
import { Scheme } from "./scheme";
const { ArgumentFormatException } = TransactionMakerExceptionGenerator("TransactionMaker", "Verifier");

@Injectable()
export class Verifier {
    private __scheme = new Scheme();
    private __typeChecker = new TypeChecker();

    /**
     * 检查数值的范围
     *
     * @param value
     * @param range
     * @param key
     */
    private __checkRange(value: number, range: { minimum?: number; maximum?: number }, key?: string) {
        const exception = {
            target: "range",
        };
        if (range.minimum !== undefined) {
            if (typeof range.minimum !== "number") {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `minimum ${range.minimum}`,
                    ...exception,
                });
            }
            if (value < range.minimum) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `value ${value}`,
                    ...exception,
                });
            }
        }
        if (range.maximum !== undefined) {
            if (typeof range.maximum !== "number") {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `maximum ${range.maximum}`,
                    ...exception,
                });
            }
            if (value > range.maximum) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `value ${value}`,
                    ...exception,
                });
            }
        }
    }

    private __verify(value: TransactionMaker.FormaterCallbackArgv, schema: TransactionMaker.SchemaType, keyName?: string) {
        const exception = {
            target: "request",
        };
        const baseHelper = this.__typeChecker;
        switch (schema.type) {
            case BASE_ARGS_TYPE.OBJECT:
                if (value) {
                    if (schema.required && schema.required.length > 0) {
                        for (const key of schema.required) {
                            if ((value as any)[key] === undefined || (value as any)[key] === null) {
                                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_REQUIRE, {
                                    prop: `keyName ${key}`,
                                    ...exception,
                                });
                            }
                        }
                    }
                    for (const key in schema.properties) {
                        this.__verify((value as any)[key], schema.properties[key], keyName ? keyName + `.${key}` : key);
                    }
                    if (schema.format) {
                        this.__scheme.verify(schema.format, value);
                    }
                }
                break;
            case BASE_ARGS_TYPE.STRING:
                // 非空判断在object那边已经做了，如果允许为空，则不再做检查。若不为空，才做检查
                if (value !== undefined) {
                    if (!baseHelper.isString(value)) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    if (schema.format) {
                        this.__scheme.verify(schema.format, value);
                    }
                }
                break;
            case BASE_ARGS_TYPE.NUMBER:
                if (value !== undefined) {
                    if (typeof value !== "number") {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    this.__checkRange(value, { maximum: schema.maximum, minimum: schema.minimum }, keyName);
                }
                break;
            case BASE_ARGS_TYPE.NATURALNUMBER:
                if (value !== undefined) {
                    if (!baseHelper.isNaturalNumber(value)) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    this.__checkRange(value, { maximum: schema.maximum, minimum: schema.minimum }, keyName);
                }
                break;
            case BASE_ARGS_TYPE.POSITIVEINTEGER: {
                if (value !== undefined) {
                    if (!baseHelper.isPositiveInteger(value)) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    this.__checkRange(value, { maximum: schema.maximum, minimum: schema.minimum }, keyName);
                }
                break;
            }
            case BASE_ARGS_TYPE.BOOLEAN:
                if (value !== undefined) {
                    if (!baseHelper.isBoolean(value)) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                }
                break;
            case BASE_ARGS_TYPE.ARRAY:
                if (value !== undefined) {
                    if (!baseHelper.isArray(value)) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    if (!schema.items) {
                        throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            ...exception,
                        });
                    }
                    for (const item of value) {
                        this.__verify(item, schema.items, keyName);
                    }
                }
                break;
            default:
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `keyName ${keyName}`,
                    ...exception,
                });
        }
    }

    verify(value: TransactionMaker.FormaterCallbackArgv, schema?: TransactionMaker.SchemaType | TransactionMaker.SchemaType[], keyName?: string) {
        if (!schema) {
            return;
        }
        if (schema instanceof Array) {
            for (const item of schema) {
                this.__verify(value, item, keyName);
            }
            return;
        }
        this.__verify(value, schema, keyName);
    }
}
