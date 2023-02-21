import { BASE_ARGS_TYPE } from "./constants";

/**admin通用参数 */
export const ADMIN_COMMON_PARAM: BFMetaPcSdk.SchemaType = {
    type: "object",
    properties: {
        verifyType: {
            type: BASE_ARGS_TYPE.STRING,
        },
        verifyKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["verifyType", "verifyKey"],
};

/**user通用参数 */
export const USER_COMMON_PARAM: BFMetaPcSdk.SchemaType = {
    type: "object",
    properties: {
        userKey: {
            type: BASE_ARGS_TYPE.STRING,
        },
        publicKey: {
            type: BASE_ARGS_TYPE.STRING,
            format: "publicKey",
        },
    },
    required: ["userKey", "publicKey"],
};

/**交易通用参数 */
export const TR_COMMON_PARAM: BFMetaPcSdk.SchemaType = {
    type: "object",
    properties: {
        secret: {
            type: BASE_ARGS_TYPE.STRING,
        },
        secondSecret: {
            type: BASE_ARGS_TYPE.STRING,
        },
        recipientId: {
            type: BASE_ARGS_TYPE.STRING,
        },
        rangeType: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
        range: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        fee: {
            type: BASE_ARGS_TYPE.STRING,
        },
        applyBlockHeight: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        remark: {
            type: BASE_ARGS_TYPE.OBJECT,
        },
        dappid: {
            type: BASE_ARGS_TYPE.STRING,
        },
        lns: {
            type: BASE_ARGS_TYPE.STRING,
        },
        sourceIP: {
            type: BASE_ARGS_TYPE.STRING,
        },
        fromMagic: {
            type: BASE_ARGS_TYPE.STRING,
        },
        toMagic: {
            type: BASE_ARGS_TYPE.STRING,
        },
        numberOfEffectiveBlocks: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
    },
    required: ["secret", "fee"],
};
