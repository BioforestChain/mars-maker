declare namespace BFMetaPcSdk {
    // type FormaterCallback = ((value: string) => void) | ((value: number) => void) | ((value: BFMetaPcSdk.AutoVoteModel) => void);
    type FormaterCallbackArgv = string | number | object;
    type FormaterCallback<T extends FormaterCallbackArgv> = (value: T) => void;
}
