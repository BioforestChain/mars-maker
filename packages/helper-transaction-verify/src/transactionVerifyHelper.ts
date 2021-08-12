import { Injectable } from "@bfchain/util";
import { BaseHelper } from "@bfchain/pc-sdk-helper-type";
import { BASE_ARGS_TYPE } from "@bfchain/pc-sdk-helper-transaction-schema";
import { Scheme } from "@bfchain/pc-sdk-helper-transaction-schema-validation";
import { SdkExceptionGenerator, PROP_IS_INVALID, PROP_IS_REQUIRE } from "@bfchain/pc-sdk-exception";
const { ArgumentFormatException } = SdkExceptionGenerator("Sdk", "Transactions-Verify");

@Injectable()
export class TransactionVerifyHelper {
    private __scheme = new Scheme();
    private __baseHelper = new BaseHelper();

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
            function: "checkRange",
        };
        if (range.minimum !== undefined) {
            if (typeof range.minimum !== "number") {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `minimum ${range.minimum}`,
                    description: `should be a number`,
                    ...exception,
                });
            }
            if (value < range.minimum) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `value ${value}`,
                    description: `should greater than or equal to ${range.minimum}`,
                    ...exception,
                });
            }
        }
        if (range.maximum !== undefined) {
            if (typeof range.maximum !== "number") {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `maximum ${range.maximum}`,
                    description: `should be a number`,
                    ...exception,
                });
            }
            if (value > range.maximum) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `value ${value}`,
                    description: `should less than or equal to ${range.maximum}`,
                    ...exception,
                });
            }
        }
    }

    private __verify(value: BFChainPcSdk.FormaterCallbackArgv, schema: BFChainPcSdk.SchemaType, keyName?: string) {
        const exception = {
            target: "request",
            function: "verify",
        };
        const baseHelper = this.__baseHelper;
        switch (schema.type) {
            case BASE_ARGS_TYPE.OBJECT:
                if (value) {
                    if (schema.required && schema.required.length > 0) {
                        for (const key of schema.required) {
                            if ((value as any)[key] === undefined || (value as any)[key] === null) {
                                throw new ArgumentFormatException(PROP_IS_REQUIRE, {
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
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `value: ${value} is not string`,
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
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `value: ${value} is not number`,
                            ...exception,
                        });
                    }
                    this.__checkRange(value, { maximum: schema.maximum, minimum: schema.minimum }, keyName);
                }
                break;
            case BASE_ARGS_TYPE.NATURALNUMBER:
                if (value !== undefined) {
                    if (!baseHelper.isNaturalNumber(value)) {
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `${value} is not natural number`,
                            ...exception,
                        });
                    }
                    this.__checkRange(value, { maximum: schema.maximum, minimum: schema.minimum }, keyName);
                }
                break;
            case BASE_ARGS_TYPE.POSITIVEINTEGER: {
                if (value !== undefined) {
                    if (!baseHelper.isPositiveInteger(value)) {
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `${value} is not positive integer`,
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
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `${value} is not boolean`,
                            ...exception,
                        });
                    }
                }
                break;
            case BASE_ARGS_TYPE.ARRAY:
                if (value !== undefined) {
                    if (!baseHelper.isArray(value)) {
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `${value} is not array`,
                            ...exception,
                        });
                    }
                    if (!schema.items) {
                        throw new ArgumentFormatException(PROP_IS_INVALID, {
                            prop: `keyName ${keyName}`,
                            description: `schema should not be undefined`,
                            ...exception,
                        });
                    }
                    for (const item of value) {
                        this.__verify(item, schema.items, keyName);
                    }
                }
                break;
            default:
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `keyName ${keyName}`,
                    description: `type: ${schema.type} is not defined`,
                    ...exception,
                });
        }
    }

    verify(value: BFChainPcSdk.FormaterCallbackArgv, schema?: BFChainPcSdk.SchemaType | BFChainPcSdk.SchemaType[], keyName?: string) {
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
