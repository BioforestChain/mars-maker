import "colors";
import { Config } from "./config";
import * as path from "node:path";
import * as util from "node:util";
import { DateRollingFileStream, RollingFileStream } from "streamroller";
import { LOGGER_LEVEL } from "@bfmeta/transaction-maker-typings";

/*增加logger的flag的可读性*/
const specialSymbol: { [flag: string]: string } = {};
specialSymbol.infoSymbol = "〈i〉";
specialSymbol.successSymbol = "〈√〉";
specialSymbol.warnSymbol = "〈‼〉";
specialSymbol.errorSymbol = "〈×〉";

export function formatPrefix(prefix?: string) {
    return `[${process.env["name"]}]` || "[master]";
}
const inspectFactory = (errorInspector: (err: Error) => string) => {
    const inspectFun = (err: unknown, level: number) => {
        let msg: string;
        if (err instanceof Error) {
            msg = errorInspector(err);
            /// 对 AggregateError.errors 进行补充打印
            const errors = (err as any).errors;
            if (Array.isArray(errors) && errors.length) {
                const nextLevel = level + 1;
                msg += `\nErrors:\n${errors
                    .map((reason, i) => {
                        const prefix = `${i + 1}:`;
                        const reasonMsg = inspectFun(reason, nextLevel);
                        if (reasonMsg.includes("\n")) {
                            const whitePrefix = " ".repeat(prefix.length) + "  ".repeat(nextLevel);
                            return `${prefix + "  ".repeat(nextLevel)}${reasonMsg.replace(/\n/g, "\n" + whitePrefix)}`;
                        } else {
                            return prefix + "  ".repeat(nextLevel) + reasonMsg;
                        }
                    })
                    .join("\n")}`;
            }

            /// @TODO 对 error.case 进行补充打印
        } else {
            msg = util.format(err);
        }
        return msg;
    };
    return inspectFun;
};

const inspectMin = inspectFactory((err) => `${err.name}: ${err.message}`);
const inspectFull = inspectFactory((err) => util.format(err));

const processNameX = () => formatPrefix(process.env.name);
export class Logger {
    private __logConfig: TransactionMaker.Server.LogConfig & Partial<{ log(message: any, data?: any): void }>;

    private __loggerColor = new Map();
    private __curenntFileLogLevel = LOGGER_LEVEL.DEBUG;
    private __curenntConsoleLevel = LOGGER_LEVEL.DEBUG;

    constructor(private __config: Config) {
        this.__loggerColor.set("error", specialSymbol.errorSymbol.red + "ERROR".bgRed.white);
        this.__loggerColor.set("warn", specialSymbol.warnSymbol.yellow + "WARN".bgYellow.black);
        this.__loggerColor.set("info", specialSymbol.infoSymbol.cyan + "INFO".bgCyan.black);
        this.__logConfig = this.__getConfig();
        let log_file: any;

        if (this.__logConfig.fileLogDateExpire) {
            this.__logConfig.fileLogDaysToKeep = this.__logConfig.fileLogDaysToKeep || 30;
            log_file = new DateRollingFileStream(this.__logConfig.filename, ".yyyy-MM-dd", { flags: "a", DaysToKeep: this.__logConfig.fileLogDaysToKeep });
        } else {
            // 最高上限500mb
            this.__logConfig.fileLogLimit = this.__logConfig.fileLogLimit > 500 ? 500 : this.__logConfig.fileLogLimit;
            this.__logConfig.fileLogBackup = this.__logConfig.fileLogBackup || 0;
            log_file = new RollingFileStream(this.__logConfig.filename, this.__logConfig.fileLogLimit * 1024 * 1024, this.__logConfig.fileLogBackup, {
                flags: "a",
            });
        }

        Object.keys(this.__logConfig.levels).forEach((levelName) => {
            const _console = console;
            const levelValue = (<any>this.__logConfig.levels)[levelName];
            const consoleLevelName = this.__getLoggerFlag(levelName);
            const log = (message: any, data?: any) => {
                let baseLogMessage = "";
                let baseLogData: string | undefined;
                ///如果不是调试模式的话, 控制台不打印错误堆栈
                if (this.__curenntConsoleLevel !== "debug") {
                    baseLogMessage = inspectMin(message, 0);
                    baseLogData = data !== undefined ? inspectMin(data, 0) : data;
                } else {
                    baseLogMessage = inspectFull(message, 0);
                    baseLogData = data !== undefined ? inspectFull(data, 0) : data;
                }

                let baseLogs = `${baseLogMessage}`;
                if (baseLogData !== undefined) {
                    baseLogs += `, ${baseLogData}`;
                }

                const timestamp = new Date().toLocaleString();

                /// 写入文件
                if ((<any>this.__logConfig.levels)[this.__curenntFileLogLevel] <= levelValue) {
                    log_file.write(`${timestamp}:${levelName} ${baseLogs}` + "\n");
                }
                /// 打印到控制台
                if (this.__curenntConsoleLevel && (<any>this.__logConfig.levels)[this.__curenntConsoleLevel] <= levelValue) {
                    _console.log(processNameX() + consoleLevelName, timestamp.grey, baseLogs);
                }
            };
            (<any>this.__logConfig)[levelName] = log;
        });
    }

    private _log(level: string, message: any, data: any) {
        (<any>this.__logConfig)[level](message, data);
    }

    debug(message: any, data?: any) {
        this._log("debug", message, data);
    }

    info(message: any, data?: any) {
        this._log("info", message, data);
    }

    warn(message: any, data?: any) {
        this._log("warn", message, data);
    }

    error(message: any, data?: any) {
        this._log("error", message, data);
    }

    /**
     * get config for logger
     */
    private __getConfig() {
        const loggerConfig = this.__config.config.loggerConfig;
        if (loggerConfig.level !== "debug" && loggerConfig.level !== "info" && loggerConfig.level !== "warn" && loggerConfig.level !== "error") {
            throw new Error(`${loggerConfig.level} is not a valid file log level`);
        }
        const logConfig = {
            errorLevel: loggerConfig.level,
            fileLogLimit: loggerConfig.limit,
            fileLogBackup: loggerConfig.backup,
            fileLogDateExpire: loggerConfig.dateExpire,
            fileLogDaysToKeep: loggerConfig.daysToRotate,
            levels: {
                debug: 1,
                info: 2,
                warn: 3,
                error: 4,
            },
        };
        this.__curenntFileLogLevel = loggerConfig.level;
        this.__curenntConsoleLevel = loggerConfig.level;
        const filename = `${process.env["name"] || "master"}.log`;
        return {
            filename: path.join(`${process.cwd()}/logs`, filename),
            ...logConfig,
        };
    }

    private __getLoggerFlag(level: string) {
        return this.__loggerColor.get(level) || level.bgYellow.black;
    }
}
export const logger = new Logger(new Config());
