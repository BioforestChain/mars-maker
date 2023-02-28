import { Injectable } from "@bfchain/util";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";
const { Exception } = TransactionMakerExceptionGenerator("TransactionMaker", "Validator");

@Injectable()
export class Validator {
    private __validatorMap = new Map<string, TransactionMaker.FormaterCallback<never>>();

    registerFormater<T extends TransactionMaker.FormaterCallbackArgv>(formatName: string, validatorFunction: TransactionMaker.FormaterCallback<T>) {
        if (this.__validatorMap.has(formatName)) {
            throw new Exception(ERROR_LIST.MODULE_DUPLICATE, {
                module: "formatName",
                target: "validatorMap",
            });
        }

        this.__validatorMap.set(formatName, validatorFunction);
    }

    runFormater<T extends TransactionMaker.FormaterCallbackArgv>(formatName: string, value: T) {
        const validatorFunction = this.__validatorMap.get(formatName) as TransactionMaker.FormaterCallback<T>;
        if (!validatorFunction) {
            throw new Exception(ERROR_LIST.MODULE_NOT_EXISTS, {
                module: "formatName",
                target: "validatorMap",
            });
        }
        validatorFunction(value);
    }
}
