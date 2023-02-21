import { Injectable } from "@bfchain/util";
import { SdkExceptionGenerator, MODULE_DUPLICATE, MODULE_NOT_EXISTS } from "@bfchain/pc-sdk-exception";
const { Exception } = SdkExceptionGenerator("Sdk", "Transactions-Schema-Validation");

@Injectable()
export class Validator {
    private __validatorMap = new Map<string, BFMetaPcSdk.FormaterCallback<never>>();

    registerFormater<T extends BFMetaPcSdk.FormaterCallbackArgv>(formatName: string, validatorFunction: BFMetaPcSdk.FormaterCallback<T>) {
        if (this.__validatorMap.has(formatName)) {
            throw new Exception(MODULE_DUPLICATE, {
                module: "formatName",
                target: "validatorMap",
                function: "registerFormater",
            });
        }

        this.__validatorMap.set(formatName, validatorFunction);
    }

    runFormater<T extends BFMetaPcSdk.FormaterCallbackArgv>(formatName: string, value: T) {
        const validatorFunction = this.__validatorMap.get(formatName) as BFMetaPcSdk.FormaterCallback<T>;
        if (!validatorFunction) {
            throw new Exception(MODULE_NOT_EXISTS, {
                module: "formatName",
                target: "validatorMap",
                function: "runFormater",
            });
        }
        validatorFunction(value);
    }
}
