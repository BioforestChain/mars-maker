import { BASE_ARGS_TYPE } from "./constants";

/**创建新的创世块 */
export const BASIC_GENERATE_GENESIS_BLOCK: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        genesisSecret: {
            type: BASE_ARGS_TYPE.STRING,
        },
        delegatesSecret: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        lang: {
            type: BASE_ARGS_TYPE.STRING,
        },
        chainName: {
            type: BASE_ARGS_TYPE.STRING,
        },
        assetType: {
            type: BASE_ARGS_TYPE.STRING,
        },
        magic: {
            type: BASE_ARGS_TYPE.STRING,
        },
        beginEpochTime: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        genesisLocationName: {
            type: BASE_ARGS_TYPE.STRING,
        },
        genesisAmount: {
            type: BASE_ARGS_TYPE.STRING,
        },
        minTransactionFeePerByte: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        maxTPSPerBlock: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        maxTransactionSize: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        maxBlockSize: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        consessusBeforeSyncBlockDiff: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        maxDelegateTxsPerRound: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        maxGrabTimesOfGiftAsset: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        issueAssetMinChainAsset: {
            type: BASE_ARGS_TYPE.STRING,
        },
        maxMultipleOfAssetAndMainAsset: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        registerChainMinChainAsset: {
            type: BASE_ARGS_TYPE.STRING,
        },
        maxApplyAndConfirmedBlockHeightDiff: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        blockPerRound: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        delegates: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        whetherToAllowDelegateContinusElections: {
            type: BASE_ARGS_TYPE.BOOLEAN,
        },
        forgeInterval: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        votePercent: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        forgePercent: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        ports: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        heights: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        rewards: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        growthFactor: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        participationRatio: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        tpowOfWorkExemptionBlocks: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
        accountParticipationWeightRatio: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        blockParticipationWeightRatio: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        averageComputingPower: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
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
export const BASIC_GET_TRANSACTION_TYPE: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        baseType: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["baseType"],
};

/**输入命令行密码 */
export const BASIC_SET_PASSWORD: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        password: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["password"],
};

/**获取指定区块 */
export const BASIC_GET_BLOCK: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        signature: {
            type: BASE_ARGS_TYPE.STRING,
        },
        height: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        page: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
    },
    required: [],
};

/**获取指定事件 */
export const BASIC_GET_TRANSACTIONS: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        signature: {
            type: BASE_ARGS_TYPE.STRING,
        },
        height: {
            type: BASE_ARGS_TYPE.POSITIVEINTEGER,
        },
        senderId: {
            type: BASE_ARGS_TYPE.STRING,
        },
        recipientId: {
            type: BASE_ARGS_TYPE.STRING,
        },
        address: {
            type: BASE_ARGS_TYPE.STRING,
        },
        type: {
            type: BASE_ARGS_TYPE.ARRAY,
            items: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        page: {
            type: BASE_ARGS_TYPE.NATURALNUMBER,
        },
    },
    required: [],
};

/**生成私钥 */
export const BASIC_GENERATE_SECRET: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        lang: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["lang"],
};

/**获取账户公钥 */
export const BASIC_GET_ACCOUNT_PUBLICKEY: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        address: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["address"],
};

/**获取账户的最后一笔交易 */
export const BASIC_GET_ACCOUNT_LAST_TRANSACTION: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        address: {
            type: BASE_ARGS_TYPE.STRING,
        },
        assetType: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["address", "assetType"],
};

/**获取账户指定类型的最后一笔交易 */
export const BASIC_GET_ACCOUNT_LAST_TYPE_TRANSACTION: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        address: {
            type: BASE_ARGS_TYPE.STRING,
        },
        transactionType: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["address", "transactionType"],
};

/**创建账户 */
export const BASIC_CREATE_ACCOUNT: BFMetaPcSdk.SchemaType = {
    type: BASE_ARGS_TYPE.OBJECT,
    properties: {
        secret: {
            type: BASE_ARGS_TYPE.STRING,
        },
    },
    required: ["secret"],
};
