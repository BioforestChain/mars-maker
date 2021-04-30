/**创建新的创世块 */
export const BASIC_GENERATE_GENESIS_BLOCK: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        genesisSecret: {
            type: "string",
        },
        delegatesSecret: {
            type: "array",
            items: {
                type: "string",
            },
        },
        lang: {
            type: "string",
        },
        chainName: {
            type: "string",
        },
        assetType: {
            type: "string",
        },
        magic: {
            type: "string",
        },
        beginEpochTime: {
            type: "integer",
        },
        genesisLocationName: {
            type: "string",
        },
        genesisAmount: {
            type: "string",
        },
        minTransactionFeePerByte: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        maxTPSPerBlock: {
            type: "integer",
        },
        maxTransactionSize: {
            type: "integer",
        },
        maxBlockSize: {
            type: "integer",
        },
        consessusBeforeSyncBlockDiff: {
            type: "integer",
        },
        maxDelegateTxsPerRound: {
            type: "integer",
        },
        maxGrabTimesOfGiftAsset: {
            type: "integer",
        },
        issueAssetMinChainAsset: {
            type: "string",
        },
        maxMultipleOfAssetAndMainAsset: {
            type: "array",
            items: {
                type: "string",
            },
        },
        registerChainMinChainAsset: {
            type: "string",
        },
        maxApplyAndConfirmedBlockHeightDiff: {
            type: "integer",
        },
        blockPerRound: {
            type: "integer",
        },
        delegates: {
            type: "integer",
        },
        whetherToAllowDelegateContinusElections: {
            type: "boolean",
        },
        forgeInterval: {
            type: "integer",
        },
        votePercent: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        forgePercent: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        ports: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        heights: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        rewards: {
            type: "array",
            items: {
                type: "string",
            },
        },
        growthFactor: {
            type: "array",
            items: {
                type: "string",
            },
        },
        participationRatio: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        tpowOfWorkExemptionBlocks: {
            type: "integer",
        },
        accountParticipationWeightRatio: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        blockParticipationWeightRatio: {
            type: "array",
            items: {
                type: "integer",
            },
        },
        averageComputingPower: {
            type: "integer",
        },
    },
    required: [
        "genesisSecret",
        "delegatesSecret",
        "lang",
        "chainName",
        "assetType",
        "magic",
        "beginEpochTime",
        "genesisLocationName",
        "genesisAmount",
        "minTransactionFeePerByte",
        "maxTPSPerBlock",
        "maxTransactionSize",
        "maxBlockSize",
        "consessusBeforeSyncBlockDiff",
        "maxDelegateTxsPerRound",
        "maxGrabTimesOfGiftAsset",
        "issueAssetMinChainAsset",
        "maxMultipleOfAssetAndMainAsset",
        "registerChainMinChainAsset",
        "maxApplyAndConfirmedBlockHeightDiff",
        "blockPerRound",
        "delegates",
        "whetherToAllowDelegateContinusElections",
        "forgeInterval",
        "votePercent",
        "forgePercent",
        "ports",
        "heights",
        "rewards",
        "growthFactor",
        "participationRatio",
        "tpowOfWorkExemptionBlocks",
        "accountParticipationWeightRatio",
        "blockParticipationWeightRatio",
        "averageComputingPower",
    ],
};

/**获取事件类型 */
export const BASIC_GET_TRANSACTION_TYPE: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        baseType: {
            type: "string",
        },
    },
    required: ["baseType"],
};

/**输入命令行密码 */
export const BASIC_SET_PASSWORD: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        password: {
            type: "string",
        },
    },
    required: ["password"],
};

/**获取指定区块 */
export const BASIC_GET_BLOCK: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        signature: {
            type: "string",
        },
        height: {
            type: "integer",
        },
        page: {
            type: "integer",
        },
    },
    required: [],
};

/**获取指定事件 */
export const BASIC_GET_TRANSACTIONS: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        signature: {
            type: "string",
        },
        height: {
            type: "integer",
        },
        senderId: {
            type: "string",
        },
        recipientId: {
            type: "string",
        },
        address: {
            type: "string",
        },
        type: {
            type: "array",
            items: {
                type: "string",
            },
        },
        page: {
            type: "integer",
        },
    },
    required: [],
};

/**生成私钥 */
export const BASIC_GENERATE_SECRET: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        lang: {
            type: "string",
        },
    },
    required: ["lang"],
};

/**获取账户公钥 */
export const BASIC_GET_ACCOUNT_PUBLICKEY: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        address: {
            type: "string",
        },
    },
    required: ["address"],
};

/**获取账户的最后一笔交易 */
export const BASIC_GET_ACCOUNT_LAST_TRANSACTION: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        address: {
            type: "string",
        },
        assetType: {
            type: "string",
        },
    },
    required: ["address", "assetType"],
};

/**创建账户 */
export const BASIC_CREATE_ACCOUNT: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        secret: {
            type: "string",
        },
    },
    required: ["secret"],
};

/**生成权益迁出事件的创世受托人签名 */
export const BASIC_EMIGRATE_ASSET_GENESIS_SIGNATURE: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        genesisAccount: {
            type: "array",
            items: {
                type: "string",
            },
        },
        senderId: {
            type: "string",
        },
    },
    required: ["genesisAccount", "senderId"],
};

/**生成权益迁入事件的创世受托人签名 */
export const BASIC_IMMIGRATE_ASSET_GENESIS_SIGNATURE: BFChainPcSdk.SchemaType = {
    type: "object",
    properties: {
        transactionSignature: {
            type: "string",
        },
        genesisAccount: {
            type: "array",
            items: {
                type: "string",
            },
        },
    },
    required: ["transactionSignature", "genesisAccount"],
};
