export declare class Validator {
    private __validatorMap;
    registerFormater<T extends BFMetaPcSdk.FormaterCallbackArgv>(formatName: string, validatorFunction: BFMetaPcSdk.FormaterCallback<T>): void;
    runFormater<T extends BFMetaPcSdk.FormaterCallbackArgv>(formatName: string, value: T): void;
}
