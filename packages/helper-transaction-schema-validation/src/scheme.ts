import { Validator } from "./validator";
import { Injectable } from "@bfchain/util";
import { BaseHelper } from "@bfchain/pc-sdk-helper-type";
import { SdkExceptionGenerator, PROP_IS_INVALID } from "@bfchain/pc-sdk-exception";
const { ArgumentFormatException } = SdkExceptionGenerator("Sdk", "Transactions-Schema-Validation");

@Injectable()
export class Scheme {
    private __validator = new Validator();
    private __baseHelper = new BaseHelper();

    constructor() {
        this.__registerIpFormater();
        this.__registerLogLevelFormater();
        this.__registerSystemKeyFormater();
        this.__registerPublicKeyFormater();
        this.__registerAutoVoteOptionsFormater();
    }

    verify(formatName: string, value: BFChainPcSdk.FormaterCallbackArgv) {
        this.__validator.runFormater(formatName, value);
    }

    private __registerPublicKeyFormater() {
        this.__validator.registerFormater("publicKey", (value: string) => {
            if (!this.__baseHelper.isString(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `publicKey ${value}`,
                    description: "not a string",
                    target: `request`,
                    function: "publicKeyFormater",
                });
            }
            const publicKey = Buffer.from(value, "hex");
            if (publicKey.length !== 32) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `publicKey ${value}`,
                    description: "not a valid publicKey",
                    target: `request`,
                    function: "publicKeyFormater",
                });
            }
        });
    }

    private __registerIpFormater() {
        this.__validator.registerFormater("ip", (value: string) => {
            if (!this.__baseHelper.isString(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `ip ${value}`,
                    target: `request`,
                    description: "not a string",
                    function: "ipFormater",
                });
            }
            const validRegEx = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!validRegEx.test(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `ip ${value}`,
                    target: `request`,
                    description: "not a valid ip",
                    function: "ipFormater",
                });
            }
        });
    }

    private __registerLogLevelFormater() {
        this.__validator.registerFormater("logLevel", (value: string) => {
            if (!this.__baseHelper.isString(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                    description: "not a string",
                    function: "logLevelFormater",
                });
            }
            const logLevels = ["info", "warn", "error"];
            if (!logLevels.includes(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                    description: "not a valid logLevel",
                    function: "logLevelFormater",
                });
            }
        });
    }

    private __registerSystemKeyFormater() {
        this.__validator.registerFormater("systemKey", (value: string) => {
            if (!this.__baseHelper.isString(value)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                    description: "not a string",
                    function: "logLevelFormater",
                });
            }
            if (value.length < 8 || value.length > 72 || !value.match(/([a-z])+/) || !value.match(/([0-9])+/) || !value.match(/([A-Z])+/)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                    description: "not a valid systemKey",
                    function: "logLevelFormater",
                });
            }
        });
    }

    private __registerAutoVoteOptionsFormater() {
        this.__validator.registerFormater("autoVoteOptions", (obj: BFChainPcSdk.AutoVote) => {
            const exception = {
                target: "request.autoVote",
                function: "autoVoteOptionsFormater",
            };
            const {
                enable,
                fee,
                numberOfRounds,
                productivityPercent,
                forgedBlocksPercent,
                applyTxPercent,
                votePercent,
                newDelegatePercent,
                minBeSelectProductivity,
            } = obj;
            if (typeof enable !== "boolean") {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `enable ${enable}`,
                    description: "not a boolean",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isValidStringNumber(fee)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `fee ${fee}`,
                    description: "not a string number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isPositiveInteger(numberOfRounds)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `numberOfRounds ${numberOfRounds}`,
                    description: "not a positive integer",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(productivityPercent)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `productivityPercent ${productivityPercent}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(forgedBlocksPercent)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `forgedBlocksPercent ${forgedBlocksPercent}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(applyTxPercent)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `applyTxPercent ${applyTxPercent}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(votePercent)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `votePercent ${votePercent}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(newDelegatePercent)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `newDelegatePercent ${newDelegatePercent}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            if (!this.__baseHelper.isNaturalNumber(minBeSelectProductivity)) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `minBeSelectProductivity ${minBeSelectProductivity}`,
                    description: "not a natural number",
                    ...exception,
                });
            }
            let sum = 0;
            sum += productivityPercent;
            sum += forgedBlocksPercent;
            sum += applyTxPercent;
            sum += votePercent;
            sum += newDelegatePercent;
            if (100 !== sum) {
                throw new ArgumentFormatException(PROP_IS_INVALID, {
                    prop: `sum of productivityPercent ${productivityPercent} and forgedBlocksPercent ${forgedBlocksPercent} and applyTxPercent ${applyTxPercent} and votePercent ${votePercent} and newDelegatePercent ${newDelegatePercent}`,
                    description: "should equal to ${100}",
                    ...exception,
                });
            }
        });
    }
}
