declare namespace TransactionMaker {
    type FormaterCallbackArgv = string | number | object;
    type FormaterCallback<T extends FormaterCallbackArgv> = (value: T) => void;

    interface AutoVote {
        /**是否开启自动投票 */
        enable: boolean;
        /**是否使用配置手续费 */
        useConfigFee: boolean;
        /**自动投票手续费 */
        fee: string;
        /**是否优先保证推荐人个数 */
        priorRecommendedNumber: boolean;
        /**选出的推荐人数量上限 */
        maxNumberOfRecommended: number;
        /**选取的区块范围, 最近的 100 轮 */
        numberOfRounds: number;
        /**在线率占比 */
        productivityPercent: number;
        /**打块数量占比 */
        forgedBlocksPercent: number;
        /**打包交易数量占比 */
        applyTxPercent: number;
        /**上一轮的得票率占比 */
        votePercent: number;
        /**新受托人占比 */
        newDelegatePercent: number;
        /**最小可被推荐得账户在线率 */
        minBeSelectProductivity: number;
    }

    interface SchemaType {
        id?: string;
        type: string;
        properties?: { [k: string]: SchemaType };
        required?: string[];
        minimum?: number;
        maximum?: number;
        minItems?: number;
        maxItems?: number;
        items?: SchemaType;
        format?: string;
    }

    namespace Server {
        type LogConfig = {
            /**日志文件名 */
            filename: string;
            /**日志文件大小限制(b) */
            fileLogLimit: number;
            /**备份日志时分割的份数 */
            fileLogBackup: number;
            /**日志过期时间 */
            fileLogDateExpire: boolean;
            /**日志保存时间 */
            fileLogDaysToKeep: number;
            levels: {
                debug: number;
                info: number;
                warn: number;
                error: number;
            };
        };

        interface TransactionRouterArgs {
            pathname: TransactionMaker.Transaction.GENERATE_TRANSACTION_API_PATH;
            params: TransactionMaker.Transaction.TransactionCommonParams;
        }

        interface MigrateCertificateRouterArgs {
            pathname: TransactionMaker.CrossChain.MIGRATE_CERTIFICATE_API_PATH;
            params: TransactionMaker.CrossChain.MigrateCertificateArgs;
        }

        interface CommonRouterArgs {
            pathname: TransactionMaker.Common.COMMON_API_PATH;
            params: TransactionMaker.Common.CommonParams;
        }

        type RouterArgs = TransactionRouterArgs | MigrateCertificateRouterArgs | CommonRouterArgs;
    }
}

declare module "streamroller" {
    class RollingFileWriteStream {}
    class RollingFileStream {
        constructor(filePath: string, size: number, backups: number, options: any);
    }
    class DateRollingFileStream {
        constructor(filename: string, pattern: string, options: any);
    }
}
