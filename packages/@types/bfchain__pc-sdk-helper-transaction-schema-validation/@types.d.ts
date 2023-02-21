declare namespace BFMetaPcSdk {
    type FormaterCallbackArgv = string | number | object;
    type FormaterCallback<T extends FormaterCallbackArgv> = (value: T) => void;
}
