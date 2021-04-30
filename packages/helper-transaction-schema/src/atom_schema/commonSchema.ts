/**admin通用参数 */
export const ADMIN_COMMON_PARAM: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        verifyType: {
            type: "string",
        },
        verifyKey: {
            type: "string",
        },
    },
    required: ["verifyType", "verifyKey"],
};

/**user通用参数 */
export const USER_COMMON_PARAM: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        userKey: {
            type: "string",
        },
        publicKey: {
            type: "string",
            format: "publicKey",
        },
    },
    required: ["userKey", "publicKey"],
};

/**交易通用参数 */
export const TR_COMMON_PARAM: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        secret: {
            type: "string",
        },
        secondSecret: {
            type: "string",
        },
        recipientId: {
            type: "string",
        },
        rangeType: {
            type: "integer",
        },
        range: {
            type: "array",
            items: {
                type: "string",
            },
        },
        fee: {
            type: "string",
        },
        applyBlockHeight: {
            type: "integer",
        },
        remark: {
            type: "string",
        },
        dappid: {
            type: "string",
        },
        lns: {
            type: "string",
        },
        sourceIP: {
            type: "string",
        },
        fromMagic: {
            type: "string",
        },
        toMagic: {
            type: "string",
        },
        numberOfEffectiveBlocks: {
            type: "integer",
        },
        tpowDifficulty: {
            type: "number",
        },
    },
    required: ["secret", "fee"],
};
