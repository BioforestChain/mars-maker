import { BASE_ARGS_TYPE } from "./constants";
import { ADMIN_COMMON_PARAM, USER_COMMON_PARAM } from "./commonSchema";

/**获取服务包状态（下载状态，运行状态） */
export const SERVICE_ADMIN_GET_PACKAGE_INFO: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**获取随机码 */
export const SERVICE_AUTH_CODE: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        address: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["address"],
};

/**将用户加入白名单，获取用户密码 */
export const SERVICE_ADD_USER: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        publicKey: {
            type: BASE_ARGS_TYPE.STRING,
            format: "publicKey",
        },
        signature: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["publicKey", "signature"],
};

/**将系统管理员用户加入白名单，获取用户密码 */
export const SERVICE_ADD_SYSTEM_ADMINUSER: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        publicKey: {
            type: BASE_ARGS_TYPE.STRING,
            format: "publicKey",
        },
    },
    required: ["publicKey"],
};

/**触发下载服务包 */
export const SERVICE_ADMIN_DOWNLOAD_PACKAGE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageVersion: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageMd5: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageSize: {
                type: BASE_ARGS_TYPE.STRING,
            },
            downloadPath: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["packageId", "packageName", "packageVersion", "packageMd5", "packageSize", "downloadPath"],
    },
];

/**触发安装服务包 */
export const SERVICE_ADMIN_INSTALL_PACKAGE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageVersion: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageMd5: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageSize: {
                type: BASE_ARGS_TYPE.STRING,
            },
            needVote: {
                type: "boolean",
            },
        },
        required: ["packageId", "packageName", "packageVersion", "packageMd5", "packageSize", "needVote"],
    },
];

/**获取修改后的DappType */
export const SERVICE_ADMIN_GET_MINER_MACHINE_DAPP_TYPE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["packageId"],
    },
];

/**矿机修改设置DappType */
export const SERVICE_ADMIN_SET_MINER_MACHINE_DAPP_TYPE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            dappIDModType: {
                type: BASE_ARGS_TYPE.STRING,
            },
            modifyDappID: {
                type: BASE_ARGS_TYPE.STRING,
            },
            paidType: {
                type: BASE_ARGS_TYPE.STRING,
            },
            paidSourceChainMagic: {
                type: BASE_ARGS_TYPE.STRING,
            },
            paidsourceChainName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            paidAssetType: {
                type: BASE_ARGS_TYPE.STRING,
            },
            paidAmount: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["packageId", "dappIDModType", "modifyDappID", "paidType", "paidSourceChainMagic", "paidsourceChainName", "paidAssetType", "paidAmount"],
    },
];

/**下载服务包简介的静态资源 */
export const SERVICE_GET_PACKAGE_FILE: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        packageId: {
            type: BASE_ARGS_TYPE.STRING,
        },
        packageVersion: {
            type: BASE_ARGS_TYPE.STRING,
        },
        fileName: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["packageId", "verpackageVersionifyKey", "fileName"],
};

/**下载服务包静态资源 */
export const SERVICE_USER_GET_PACKAGE_SOURCE: BFChainPcSdk.SchemaType[] = [USER_COMMON_PARAM, SERVICE_GET_PACKAGE_FILE];

const GET_UPLOAD_PACKAGE_TOKEN_COMMON: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        publicKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        uploadFileInfo: {
            type: BASE_ARGS_TYPE.OBJECT,
            properties: {
                uploadMd5: {
                    type: BASE_ARGS_TYPE.STRING,
                },
                uploadSize: {
                    type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                },
            },
        },
    },
    required: ["publicKey", "uploadFileInfo"],
};
/**获取上传服务包静态资源token */
export const SERVICE_USER_GET_UPLOAD_PACKAGE_TOKEN: BFChainPcSdk.SchemaType[] = [USER_COMMON_PARAM, GET_UPLOAD_PACKAGE_TOKEN_COMMON];

/**矿主或管理员获取上传服务包静态资源token */
export const SERVICE_ADMIN_GET_ADMIN_UPLOAD_PACKAGE_TOKEN: BFChainPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, GET_UPLOAD_PACKAGE_TOKEN_COMMON];

/**取消当前下载任务 */
export const SERVICE_ADMIN_CLEAR_DOWNLOAD_STATE: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**触发删除卸载服务包 */
export const SERVICE_ADMIN_UNINSTALL_AND_DELETE_PACKAGE: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageVersion: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            deleteData: {
                type: BASE_ARGS_TYPE.STRING,
            },
            deletePackage: {
                type: BASE_ARGS_TYPE.STRING,
            },
            deleteStaticResource: {
                type: BASE_ARGS_TYPE.STRING,
            },
            deleteDatabase: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["packageId", "packageVersion"],
    },
];

/**获取已经下载的服务包信息 */
export const SERVICE_ADMIN_GET_DOWNLOADED_PACKAGE_INFO: BFChainPcSdk.SchemaType[] = [
    ADMIN_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            ip: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageName: {
                type: BASE_ARGS_TYPE.STRING,
            },
            packageVersion: {
                type: BASE_ARGS_TYPE.STRING,
            },
            run: {
                type: BASE_ARGS_TYPE.BOOLEAN,
            },
            orderBy: {
                type: BASE_ARGS_TYPE.STRING,
            },
            offset: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            limit: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        required: [],
    },
];

/**获取服务包的用户前端模块 */
export const SERVICE_GET_USER_PACKAGE: BFChainPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        packageId: {
            type: BASE_ARGS_TYPE.STRING,
        },
        packageVersion: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["packageId", "packageVersion"],
};

/**获取服务包的admin前端模块 */
export const SERVICE_ADMIN_GET_ADMIN_PACKAGE: BFChainPcSdk.SchemaType[] = [ADMIN_COMMON_PARAM, SERVICE_GET_USER_PACKAGE];

/**获得安装服务包的安装历史 */
export const SERVICE_ADMIN_INSTALL_PACKAGE_HISTORY: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;

/**测试接口 */
export const SERVICE_USER_TEST: BFChainPcSdk.SchemaType = USER_COMMON_PARAM;

/**管理员测试接口 */
export const SERVICE_ADMIN_TEST: BFChainPcSdk.SchemaType = ADMIN_COMMON_PARAM;
