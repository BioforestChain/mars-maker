import { Injectable } from "@bfchain/util";
import { Validator } from "./validator";
import { TypeChecker } from "./typeChecker";
import { TransactionMakerExceptionGenerator, ERROR_LIST } from "../exception";
const { ArgumentFormatException } = TransactionMakerExceptionGenerator("TransactionMaker", "Scheme");

@Injectable()
export class Scheme {
    private __validator = new Validator();
    private __typeChecker = new TypeChecker();

    constructor() {
        this.__registerIpFormater();
        this.__registerLogLevelFormater();
        this.__registerSystemKeyFormater();
        this.__registerPublicKeyFormater();
        this.__registerAutoVoteOptionsFormater();
    }

    verify(formatName: string, value: TransactionMaker.FormaterCallbackArgv) {
        this.__validator.runFormater(formatName, value);
    }

    private __registerPublicKeyFormater() {
        this.__validator.registerFormater("publicKey", (value: string) => {
            if (!this.__typeChecker.isString(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `publicKey ${value}`,
                    target: `request`,
                });
            }
            const publicKey = Buffer.from(value, "hex");
            if (publicKey.length !== 32) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `publicKey ${value}`,
                    target: `request`,
                });
            }
        });
    }

    private __registerIpFormater() {
        this.__validator.registerFormater("ip", (value: string) => {
            if (!this.__typeChecker.isString(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `ip ${value}`,
                    target: `request`,
                });
            }
            const validRegEx = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!validRegEx.test(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `ip ${value}`,
                    target: `request`,
                });
            }
        });
    }

    private __registerLogLevelFormater() {
        this.__validator.registerFormater("logLevel", (value: string) => {
            if (!this.__typeChecker.isString(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                });
            }
            const logLevels = ["info", "warn", "error"];
            if (!logLevels.includes(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                });
            }
        });
    }

    private __registerSystemKeyFormater() {
        this.__validator.registerFormater("systemKey", (value: string) => {
            if (!this.__typeChecker.isString(value)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                });
            }
            if (value.length < 8 || value.length > 72 || !value.match(/([a-z])+/) || !value.match(/([0-9])+/) || !value.match(/([A-Z])+/)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `logLevel ${value}`,
                    target: `request`,
                });
            }
        });
    }

    private __registerAutoVoteOptionsFormater() {
        this.__validator.registerFormater("autoVoteOptions", (obj: TransactionMaker.AutoVote) => {
            const exception = {
                target: "request.autoVote",
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
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `enable ${enable}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isValidStringNumber(fee)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `fee ${fee}`,
                    description: "not a string number",
                    ...exception,
                });
            }
            if (!this.__typeChecker.isPositiveInteger(numberOfRounds)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `numberOfRounds ${numberOfRounds}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(productivityPercent)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `productivityPercent ${productivityPercent}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(forgedBlocksPercent)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `forgedBlocksPercent ${forgedBlocksPercent}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(applyTxPercent)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `applyTxPercent ${applyTxPercent}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(votePercent)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `votePercent ${votePercent}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(newDelegatePercent)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `newDelegatePercent ${newDelegatePercent}`,
                    ...exception,
                });
            }
            if (!this.__typeChecker.isNaturalNumber(minBeSelectProductivity)) {
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `minBeSelectProductivity ${minBeSelectProductivity}`,
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
                throw new ArgumentFormatException(ERROR_LIST.PROP_IS_INVALID, {
                    prop: `sum of productivityPercent ${productivityPercent} and forgedBlocksPercent ${forgedBlocksPercent} and applyTxPercent ${applyTxPercent} and votePercent ${votePercent} and newDelegatePercent ${newDelegatePercent}`,
                    ...exception,
                });
            }
        });
    }
}
