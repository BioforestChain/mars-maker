export declare class Validator {
    private __validatorMap;
    registerFormater<T extends BFChainPcSdk.FormaterCallbackArgv>(formatName: string, validatorFunction: BFChainPcSdk.FormaterCallback<T>): void;
    runFormater<T extends BFChainPcSdk.FormaterCallbackArgv>(formatName: string, value: T): void;
}
