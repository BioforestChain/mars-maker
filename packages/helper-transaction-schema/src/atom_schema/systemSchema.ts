import { ADMIN_COMMON_PARAM } from "./commonSchema";

/**安全关闭节点 */
export const SYSTEM_SAFETY_CLOSE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            isShutdown: {
                type: "boolean",
            },
        },
        required: [],
    },
];

/**设置节点密码 */
export const SYSTEM_SET_SYSTEM_KEY: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKeyOld: {
            type: "string",
        },
        systemKeyNew: {
            type: "string",
        },
        newKeyDecryptEnable: {
            type: "boolean",
        },
    },
    required: ["systemKeyOld", "systemKeyNew"],
};

/**验证节点密码 */
export const SYSTEM_VERIFY_SYSTEM_KEY: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKey: {
            type: "string",
        },
    },
    required: ["systemKey"],
};

/**增加节点管理员 */
export const SYSTEM_ADD_SYSTEM_ADMIN: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKey: {
            type: "string",
        },
        systemAdminAddress: {
            type: "string",
        },
    },
    required: ["systemKey", "systemAdminAddress"],
};

/**获得节点管理员 */
export const SYSTEM_GET_SYSTEM_ADMIN: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKey: {
            type: "string",
        },
        systemAdminAddress: {
            type: "string",
        },
    },
    required: ["systemKey"],
};

/**验证节点管理员 */
export const SYSTEM_VERIFY_SYSTEM_ADMIN: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        cryptoAdminAddress: {
            type: "string",
        },
    },
    required: ["cryptoAdminAddress"],
};

/**删除节点管理员 */
export const SYSTEM_DELETE_SYSTEM_ADMIN: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKey: {
            type: "string",
        },
        systemAdminAddress: {
            type: "string",
        },
    },
    required: ["systemKey", "systemAdminAddress"],
};

/**重置节点管理员 */
export const SYSTEM_RESET_SYSTEM_ADMIN: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        systemKey: {
            type: "string",
        },
        systemAdminAddresses: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
    required: ["systemKey", "systemAdminAddresses"],
};

/**绑定节点账户 */
export const SYSTEM_BINDING_ACCOUNT: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        cryptoSecret: {
            type: "string",
        },
        systemKey: {
            type: "string",
        },
        secondSecret: {
            type: "string",
        },
    },
    required: ["cryptoSecret", "systemKey"],
};

/**批量绑定受托人 */
export const SYSTEM_SET_SYSTEM_DELEGATE_MULTI: BFChainPcSdk.SchemaType = SYSTEM_BINDING_ACCOUNT;

/**获得节点受托人 */
export const SYSTEM_GET_SYSTEM_DELEGATE: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**查询该节点注入的所有锻造者 */
export const SYSTEM_GET_INJECT_GENERATORS: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**查询该节点注入的锻造者详情信息 */
export const SYSTEM_GET_SYSTEM_DELEGATE_DETAIL: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            address: {
                type: "string",
            },
        },
        required: ["address"],
    },
];

/**获得节点详情 */
export const SYSTEM_GET_SYSTEM_NODEINFO: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**节点信息查询 */
export const SYSTEM_MINING_MACHINE_INFO: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**设置节点配置信息 */
export const SYSTEM_SET_SYSTEM_CONFIG: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            config: {
                type: "object",
                properties: {
                    transactionConfig: {
                        type: "object",
                        properties: {
                            receiveVoteEnable: { type: "boolean" },
                            maxTransactionLimitForVote: { type: "integer", minimum: 0 },
                            transactionsLimitPerBlock: { type: "integer", minimum: 0 },
                            minFeePerByte: {
                                type: "object",
                                properties: {
                                    numerator: { type: "integer", minimum: 0 },
                                    denominator: { type: "integer", minimum: 0 },
                                },
                            },
                            autoVote: {
                                type: "object",
                                properties: {
                                    enable: { type: "boolean" },
                                    useConfigFee: { type: "boolean" },
                                    fee: { type: "string" },
                                    priorRecommendedNumber: { type: "boolean" },
                                    maxNumberOfRecommended: { type: "integer", minimum: 0 },
                                    numberOfRounds: { type: "integer", minimum: 0 },
                                    productivityPercent: { type: "integer", minimum: 0 },
                                    forgedBlocksPercent: { type: "integer", minimum: 0 },
                                    applyTxPercent: { type: "integer", minimum: 0 },
                                    votePercent: { type: "integer", minimum: 0 },
                                    newDelegatePercent: { type: "integer", minimum: 0 },
                                    minBeSelectProductivity: { type: "integer", minimum: 0 },
                                },
                            },
                        },
                    },
                    coreForProcess: {
                        type: "object",
                        properties: {
                            forceUseConfig: { type: "boolean" },
                            coreNumForDealTransaction: { type: "integer", minimum: 1 },
                            coreNumForMemInfo: { type: "integer", minimum: 1 },
                            coreNumForUntreatedTrs: { type: "integer", minimum: 1 },
                        },
                    },
                    logConfig: {
                        type: "object",
                        properties: {
                            consoleLogLevel: { type: "string" },
                            fileLogLevel: { type: "string" },
                            fileLogLimit: { type: "integer", minimum: 0 },
                            fileLogBackup: { type: "integer" },
                            fileLogDateExpire: { type: "boolean" },
                            fileLogDaysToKeep: { type: "integer" },
                        },
                    },
                    networkConfig: { type: "object", properties: { grpcEnable: { type: "boolean" } } },
                    startConfig: {
                        type: "object",
                        properties: {
                            useCheckPoint: { type: "boolean" },
                            numberOfReservedCheckPoint: { type: "integer", minimum: 0 },
                            peers: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "ip",
                                },
                            },
                            maxChannelNumber: { type: "integer", minimum: 0 },
                            generateBlockEnable: { type: "boolean" },
                            remark: { type: "string" },
                        },
                    },
                    flowControlConfig: {
                        type: "object",
                        properties: {
                            requestLimit: {
                                type: "object",
                                properties: {
                                    enable: { type: "boolean" },
                                    count: { type: "integer", minimum: 0 },
                                    apiRequestInterface: { type: "object" },
                                    time: { type: "integer", minimum: 0 },
                                },
                            },
                            flowRequestLimit: {
                                type: "object",
                                properties: {
                                    enable: { type: "boolean" },
                                    count: { type: "integer", minimum: 0 },
                                    time: { type: "integer", minimum: 0 },
                                },
                            },
                        },
                    },
                    noticeConfig: {
                        type: "object",
                        properties: {
                            sendCondition: {
                                type: "object",
                                properties: {
                                    usageCPU: { type: "number", minimum: 0 },
                                    usageDisk: { type: "number", minimum: 0 },
                                    usageMemory: { type: "number", minimum: 0 },
                                    missedBlocks: { type: "integer", minimum: 0 },
                                },
                            },
                            sendIntervalTime: { type: "integer", minimum: 0 },
                        },
                    },
                    diskMonitorConfig: {
                        type: "object",
                        properties: {
                            enable: { type: "boolean" },
                            clearPath: {
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            clearWhenFreeSpaceLowerThan: { type: "integer", minimum: 0 },
                            clearWithSuffix: {
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            noClearWithSuffix: {
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                            noClearWithLastModifyTimeGreaterThen: { type: "integer", minimum: 0 },
                            checkInterval: { type: "integer", minimum: 0 },
                        },
                    },
                },
            },
        },
        required: ["config"],
    },
];

/**获得节点配置信息 */
export const SYSTEM_GET_SYSTEM_CONFIG_INFO_DETAIL: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点状态（实时信息） */
export const SYSTEM_GET_RUNTIME_STATE: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点访问统计信息 */
export const SYSTEM_GET_SYSTEM_MONITOR: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            monitorType: {
                type: "string",
            },
            limit: {
                type: "integer",
            },
            offset: {
                type: "integer",
            },
        },
        required: [],
    },
];

/**获得节点运行日志类型 */
export const SYSTEM_GET_SYSTEM_LOGGER_TYPE: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获得节点运行日志列表 */
export const SYSTEM_GET_SYSTEM_LOGGER_LIST: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            loggerType: {
                type: "string",
            },
        },
        required: ["loggerType"],
    },
];

/**获得节点运行日志内容 */
export const SYSTEM_GET_SYSTEM_LOGGER_DETAIL: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            loggerName: {
                type: "string",
            },
            limit: {
                type: "integer",
            },
            offset: {
                type: "integer",
            },
            searchString: {
                type: "string",
            },
            readFileType: {
                type: "integer",
            },
        },
        required: ["loggerName"],
    },
];

/**删除节点运行日志 */
export const SYSTEM_DELETE_SYSTEM_LOGGER: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            loggerName: {
                type: "string",
            },
        },
        required: ["loggerName"],
    },
];

/**获得节点邮箱地址 */
export const SYSTEM_GET_EMAIL_ADDRESS: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            emailAddress: {
                type: "string",
            },
        },
        required: [],
    },
];

/**设置节点邮箱地址 */
export const SYSTEM_SET_EMAIL_ADDRESS: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            emailToAddress: {
                type: "string",
            },
            emailFromAddress: {
                type: "string",
            },
            emailConfig: {
                type: "object",
                properties: {
                    type: {
                        type: "string",
                    },
                    host: {
                        type: "string",
                    },
                    port: {
                        type: "integer",
                    },
                    secureConnection: {
                        type: "boolean",
                    },
                    ssl: {
                        type: "boolean",
                    },
                    tls: {
                        type: "boolean",
                    },
                    auth: {
                        type: "object",
                        properties: {
                            user: {
                                type: "string",
                            },
                            pass: {
                                type: "string",
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
export const SYSTEM_VERIFY_SYSTEM_SECRET: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        cryptoSecret: {
            type: "string",
        },
    },
    required: ["cryptoSecret"],
};

/**设置节点访问白名单 */
export const SYSTEM_SET_SYSTEM_WHITELIST: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            whiteList: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: ["whiteList"],
    },
];

/**获得节点访问白名单 */
export const SYSTEM_GET_SYSTEM_WHITELIST: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**删除节点访问白名单 */
export const SYSTEM_DELETE_SYSTEM_WHITELIST: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            whiteList: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: ["whiteList"],
    },
];

const GET_PROCESS_BASE: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        limit: {
            type: "integer",
        },
        offset: {
            type: "integer",
        },
        processType: {
            type: "string",
        },
    },
    required: [],
};

/**获得节点进程的网络相关信息 */
export const SYSTEM_GET_PROCESS_NETWORK: BFChainPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**获得节点进程CPU信息 */
export const SYSTEM_GET_PROCESS_CPU: BFChainPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**获得节点进程内存信息 */
export const SYSTEM_GET_PROCESS_MEMORY: BFChainPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_PROCESS_BASE];

/**定时发送节点状态  */
export const SYSTEM_STATUS: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**定时发送节点CPU，内存，网络信息 */
export const SYSTEM_PROCESS: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获取服务市场信息 */
export const SYSTEM_GET_SERVICE_INFO: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            dappid: {
                type: "string",
            },
        },
        required: [],
    },
];

/**获取服务市场Peer信息 */
export const SYSTEM_GET_SERVICE_PEERINFO: BFChainPcSdk.SchemaType[] = SYSTEM_GET_SERVICE_INFO;

/**设置是否开启自动socket发送 */
export const SYSTEM_SET_SOCKET_EMIT_ENABLE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: "object",
        properties: {
            systemStatusEnable: {
                type: "boolean",
            },
            systemProcessEnable: {
                type: "boolean",
            },
        },
        required: ["systemStatusEnable", "systemProcessEnable"],
    },
];
