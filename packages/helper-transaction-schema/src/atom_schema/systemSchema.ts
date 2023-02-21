import { BASE_ARGS_TYPE } from "./constants";
import { ADMIN_COMMON_PARAM } from "./commonSchema";

/**安全关闭节点 */
export const SYSTEM_SAFETY_CLOSE: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            isShutdown: {
                type: BASE_ARGS_TYPE.BOOLEAN,
            },
        },
        required: [],
    },
];

/**设置节点密码 */
export const SYSTEM_SET_SYSTEM_KEY: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKeyOld: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemKeyNew: {
            type: BASE_ARGS_TYPE.STRING,
        },
        newKeyDecryptEnable: {
            type: BASE_ARGS_TYPE.BOOLEAN,
        },
    },
    required: ["systemKeyOld", "systemKeyNew"],
};

/**验证节点密码 */
export const SYSTEM_VERIFY_SYSTEM_KEY: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["systemKey"],
};

/**增加节点管理员 */
export const SYSTEM_ADD_SYSTEM_ADMIN: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemAdminAddress: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["systemKey", "systemAdminAddress"],
};

/**获得节点管理员 */
export const SYSTEM_GET_SYSTEM_ADMIN: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemAdminAddress: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["systemKey"],
};

/**验证节点管理员 */
export const SYSTEM_VERIFY_SYSTEM_ADMIN: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        cryptoAdminAddress: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["cryptoAdminAddress"],
};

/**删除节点管理员 */
export const SYSTEM_DELETE_SYSTEM_ADMIN: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemAdminAddress: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["systemKey", "systemAdminAddress"],
};

/**重置节点管理员 */
export const SYSTEM_RESET_SYSTEM_ADMIN: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemAdminAddresses: {
            type: "array",
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
    },
    required: ["systemKey", "systemAdminAddresses"],
};

/**绑定节点账户 */
export const SYSTEM_BINDING_ACCOUNT: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        cryptoSecret: {
            type: BASE_ARGS_TYPE.STRING,
        },
        systemKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        secondSecret: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["cryptoSecret", "systemKey"],
};

/**批量绑定受托人 */
export const SYSTEM_SET_SYSTEM_DELEGATE_MULTI: BFMetaPcSdk.SchemaType = SYSTEM_BINDING_ACCOUNT;

/**获得节点受托人 */
export const SYSTEM_GET_SYSTEM_DELEGATE: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**查询该节点注入的所有锻造者 */
export const SYSTEM_GET_INJECT_GENERATORS: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**查询该节点注入的锻造者详情信息 */
export const SYSTEM_GET_SYSTEM_DELEGATE_DETAIL: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            address: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["address"],
    },
];

/**获得节点详情 */
export const SYSTEM_GET_SYSTEM_NODEINFO: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**节点信息查询 */
export const SYSTEM_MINING_MACHINE_INFO: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**设置节点配置信息 */
export const SYSTEM_SET_SYSTEM_CONFIG: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            config: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    transactionConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            receiveVoteEnable: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                            maxTransactionLimitForVote: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            transactionsLimitPerBlock: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            minFeePerByte: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    numerator: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    denominator: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                },
                            },
                            autoVote: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    enable: {
                                        type: BASE_ARGS_TYPE.BOOLEAN,
                                    },
                                    useConfigFee: {
                                        type: BASE_ARGS_TYPE.BOOLEAN,
                                    },
                                    fee: {
                                        type: BASE_ARGS_TYPE.STRING,
                                    },
                                    priorRecommendedNumber: {
                                        type: BASE_ARGS_TYPE.BOOLEAN,
                                    },
                                    maxNumberOfRecommended: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    numberOfRounds: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    productivityPercent: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    forgedBlocksPercent: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    applyTxPercent: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    votePercent: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    newDelegatePercent: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    minBeSelectProductivity: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                },
                            },
                        },
                    },
                    coreForProcess: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            forceUseConfig: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                            coreNumForDealTransaction: {
                                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                            },
                            coreNumForMemInfo: {
                                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                            },
                            coreNumForUntreatedTrs: {
                                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                            },
                        },
                    },
                    logConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            consoleLogLevel: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            fileLogLevel: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            fileLogLimit: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            fileLogBackup: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            fileLogDateExpire: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                            fileLogDaysToKeep: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                        },
                    },
                    networkConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            grpcEnable: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                        },
                    },
                    startConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            useCheckPoint: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                            numberOfReservedCheckPoint: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            peers: {
                                type: BASE_ARGS_TYPE.ARRAY,
                                items: {
                                    type: BASE_ARGS_TYPE.STRING,
                                    format: "ip",
                                },
                            },
                            maxChannelNumber: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            generateBlockEnable: {
                                type: BASE_ARGS_TYPE.BOOLEAN,
                            },
                            remark: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                    },
                    flowControlConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            requestLimit: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    enable: {
                                        type: BASE_ARGS_TYPE.BOOLEAN,
                                    },
                                    count: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    apiRequestInterface: {
                                        type: BASE_ARGS_TYPE.OBJECT,
                                    },
                                    time: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                },
                            },
                            flowRequestLimit: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    enable: {
                                        type: BASE_ARGS_TYPE.BOOLEAN,
                                    },
                                    count: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    time: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                },
                            },
                        },
                    },
                    noticeConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            sendCondition: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    usageCPU: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    usageDisk: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    usageMemory: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                    missedBlocks: {
                                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                                    },
                                },
                            },
                            sendIntervalTime: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                        },
                    },
                    diskMonitorConfig: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            enable: { type: BASE_ARGS_TYPE.BOOLEAN },
                            clearPath: {
                                type: BASE_ARGS_TYPE.ARRAY,
                                items: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            clearWhenFreeSpaceLowerThan: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            clearWithSuffix: {
                                type: BASE_ARGS_TYPE.ARRAY,
                                items: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            noClearWithSuffix: {
                                type: BASE_ARGS_TYPE.ARRAY,
                                items: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            noClearWithLastModifyTimeGreaterThen: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                            checkInterval: {
                                type: BASE_ARGS_TYPE.NATURALNUMBER,
                            },
                        },
                    },
                },
            },
        },
        required: ["config"],
    },
];

/**获得节点配置信息 */
export const SYSTEM_GET_SYSTEM_CONFIG_INFO_DETAIL: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点状态（实时信息） */
export const SYSTEM_GET_RUNTIME_STATE: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点访问统计信息 */
export const SYSTEM_GET_SYSTEM_MONITOR: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            monitorType: {
                type: BASE_ARGS_TYPE.STRING,
            },
            limit: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            offset: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        required: [],
    },
];

/**获得节点运行日志类型 */
export const SYSTEM_GET_SYSTEM_LOGGER_TYPE: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点运行日志列表 */
export const SYSTEM_GET_SYSTEM_LOGGER_LIST: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            loggerType: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["loggerType"],
    },
];

/**获得节点运行日志内容 */
export const SYSTEM_GET_SYSTEM_LOGGER_DETAIL: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            loggerName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            limit: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            offset: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            searchString: {
                type: BASE_ARGS_TYPE.STRING,
            },
            readFileType: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        required: ["loggerName"],
    },
];

/**删除节点运行日志 */
export const SYSTEM_DELETE_SYSTEM_LOGGER: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            loggerName: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["loggerName"],
    },
];

/**获得节点邮箱地址 */
export const SYSTEM_GET_EMAIL_ADDRESS: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            emailAddress: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: [],
    },
];

/**设置节点邮箱地址 */
export const SYSTEM_SET_EMAIL_ADDRESS: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            emailToAddress: {
                type: BASE_ARGS_TYPE.STRING,
            },
            emailFromAddress: {
                type: BASE_ARGS_TYPE.STRING,
            },
            emailConfig: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    type: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    host: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    port: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    secureConnection: {
                        type: BASE_ARGS_TYPE.BOOLEAN,
                    },
                    ssl: {
                        type: BASE_ARGS_TYPE.BOOLEAN,
                    },
                    tls: {
                        type: BASE_ARGS_TYPE.BOOLEAN,
                    },
                    auth: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            user: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            pass: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["user", "pass"],
                    },
                },
                required: ["type"],
            },
        },
        required: ["emailToAddress", "emailFromAddress", "emailConfig"],
    },
];

/**通过节点私钥验证节点受托人 */
export const SYSTEM_VERIFY_SYSTEM_SECRET: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        cryptoSecret: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["cryptoSecret"],
};

/**设置节点访问白名单 */
export const SYSTEM_SET_SYSTEM_WHITELIST: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            whiteList: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["whiteList"],
    },
];

/**获得节点访问白名单 */
export const SYSTEM_GET_SYSTEM_WHITELIST: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**删除节点访问白名单 */
export const SYSTEM_DELETE_SYSTEM_WHITELIST: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            whiteList: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["whiteList"],
    },
];

const GET_PROCESS_BASE: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        limit: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
        offset: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
        processType: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: [],
};

/**获得节点进程的网络相关信息 */
export const SYSTEM_GET_PROCESS_NETWORK: BFMetaPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**获得节点进程CPU信息 */
export const SYSTEM_GET_PROCESS_CPU: BFMetaPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**获得节点进程内存信息 */
export const SYSTEM_GET_PROCESS_MEMORY: BFMetaPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**定时发送节点状态  */
export const SYSTEM_STATUS: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**定时发送节点CPU，内存，网络信息 */
export const SYSTEM_PROCESS: BFMetaPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获取服务市场信息 */
export const SYSTEM_GET_SERVICE_INFO: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            dappid: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: [],
    },
];

/**获取服务市场Peer信息 */
export const SYSTEM_GET_SERVICE_PEERINFO: BFMetaPcSdk.SchemaType[] = SYSTEM_GET_SERVICE_INFO;

/**设置是否开启自动socket发送 */
export const SYSTEM_SET_SOCKET_EMIT_ENABLE: BFMetaPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            systemStatusEnable: {
                type: BASE_ARGS_TYPE.BOOLEAN,
            },
            systemProcessEnable: {
                type: BASE_ARGS_TYPE.BOOLEAN,
            },
        },
        required: ["systemStatusEnable", "systemProcessEnable"],
    },
];
