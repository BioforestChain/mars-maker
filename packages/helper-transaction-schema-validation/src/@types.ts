declare namespace BFChainPcSdk {
    // type FormaterCallback = ((value: string) => void) | ((value: number) => void) | ((value: BFChainPcSdk.AutoVoteModel) => void);
    type FormaterCallbackArgv = string | number | object;
    type FormaterCallback<T extends FormaterCallbackArgv> = (value: T) => void;
}
