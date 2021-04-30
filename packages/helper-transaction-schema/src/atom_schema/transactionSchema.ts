import { TR_COMMON_PARAM } from "./commonSchema";

/**发送设置用户名事件 */
export const TR_USERNAME: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            alias: {
                type: "string",
            },
        },
        required: ["alias"],
    },
];
/**发送设置安全密码事件 */
export const TR_SIGNATURE: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            newSecondSecret: {
                type: "string",
            },
        },
        required: ["newSecondSecret"],
    },
];
/**发送注册受托人事件 */
export const TR_DELEGATE: BFChainPcSdk.SchemaType = TR_COMMON_PARAM;
/**发送接收投票事件 */
export const TR_ACCEPT_VOTE: BFChainPcSdk.SchemaType = TR_COMMON_PARAM;
/**发送拒绝投票事件  */
export const TR_REJECT_VOTE: BFChainPcSdk.SchemaType = TR_COMMON_PARAM;
/**发送投票事件 */
export const TR_VOTE: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            equity: {
                type: "string",
            },
        },
        required: ["equity", "recipientId"],
    },
];

/**发送权益发行事件 */
export const TR_ISSUE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            assetType: {
                type: "string",
            },
            expectedIssuedAssets: {
                type: "string",
            },
        },
        required: ["assetType", "expectedIssuedAssets", "recipientId"],
    },
];
/**发送转账事件 */
export const TR_TRANSFER_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            amount: {
                type: "string",
            },
            assetType: {
                type: "string",
            },
            sourceChainName: {
                type: "string",
            },
            sourceChainMagic: {
                type: "string",
            },
        },
        required: ["amount", "recipientId"],
    },
];
/**发送权益销毁事件 */
export const TR_DESTORY_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            amount: {
                type: "string",
            },
            assetType: {
                type: "string",
            },
        },
        required: ["amount", "assetType", "recipientId"],
    },
];
/**发送权益赠与事件（红包事件） */
export const TR_GIFT_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            sourceChainMagic: {
                type: "string",
            },
            sourceChainName: {
                type: "string",
            },
            assetType: {
                type: "string",
            },
            amount: {
                type: "string",
            },
            totalGrabableTimes: {
                type: "integer",
            },
            numberOfBeginUnfrozenBlocks: {
                type: "integer",
            },
            giftDistributionRule: {
                type: "integer",
            },
            ciphertexts: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: ["amount", "totalGrabableTimes", "giftDistributionRule"],
    },
];
/**发送接受权益赠与事件（抢红包事件） */
export const TR_GRAB_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            amount: {
                type: "string",
            },
            blockSignature: {
                type: "string",
            },
            transactionSignature: {
                type: "string",
            },
            ciphertext: {
                type: "string",
            },
        },
        required: ["amount", "blockSignature", "transactionSignature"],
    },
];
/**发送权益委托事件 */
export const TR_TRUST_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            trustees: {
                type: "array",
                items: {
                    type: "string",
                },
            },
            numberOfSignFor: {
                type: "integer",
            },
            sourceChainName: {
                type: "string",
            },
            sourceChainMagic: {
                type: "string",
            },
            assetType: {
                type: "string",
            },
            amount: {
                type: "string",
            },
        },
        required: ["trustees", "numberOfSignFor", "amount", "recipientId"],
    },
];
/**发送签收权益委托事件 */
export const TR_SIGN_FOR_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
        },
        required: ["transactionSignature"],
    },
];
/**发送权益交换事件 */
export const TR_TO_EXCHANGE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            toExchangeSource: {
                type: "string",
            },
            beExchangeSource: {
                type: "string",
            },
            toExchangeChainName: {
                type: "string",
            },
            beExchangeChainName: {
                type: "string",
            },
            toExchangeAsset: {
                type: "string",
            },
            beExchangeAsset: {
                type: "string",
            },
            toExchangeNumber: {
                type: "string",
            },
            prevWeight: {
                type: "string",
            },
            nextWeight: {
                type: "string",
            },
            ciphertexts: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: [
            "toExchangeSource",
            "beExchangeSource",
            "toExchangeChainName",
            "beExchangeChainName",
            "toExchangeAsset",
            "beExchangeAsset",
            "toExchangeNumber",
            "prevWeight",
            "nextWeight",
        ],
    },
];
/**发送接受权益交换事件 */
export const TR_BE_EXCHANGE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
            beExchangeNumber: {
                type: "string",
            },
            toExchangeNumber: {
                type: "string",
            },
            ciphertext: {
                type: "string",
            },
        },
        required: ["transactionSignature", "beExchangeNumber", "toExchangeNumber", "recipientId"],
    },
];

/**发送发行dapp事件 */
export const TR_DAPP: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            newDappid: {
                type: "string",
            },
            type: {
                type: "integer",
            },
            amount: {
                type: "string",
            },
            sourceChainName: {
                type: "string",
            },
            sourceChainMagic: {
                type: "string",
            },
            assetType: {
                type: "string",
            },
        },
        required: ["newDappid", "type", "amount", "recipientId"],
    },
];
/**发送dapp购买事件 */
export const TR_DAPP_PURCHASING: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
        },
        required: ["transactionSignature", "recipientId"],
    },
];
/**发送存证事件 */
export const TR_MARK: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
            markPossessor: {
                type: "string",
            },
            content: {
                type: "string",
            },
            action: {
                type: "string",
            },
        },
        required: ["transactionSignature", "markPossessor", "content", "action"],
    },
];
/**发送注册、注销位名事件 */
export const TR_LOCATION_NAME: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
            operationType: {
                type: "integer",
            },
        },
        required: ["name", "operationType", "recipientId"],
    },
];
/**发送设置位名管理员事件 */
export const TR_SET_LNS_MANAGER: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
        },
        required: ["name", "recipientId"],
    },
];
/**发送设置位名解析值事件 */
export const TR_SET_LNS_RECORD_VALUE: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
            operationType: {
                type: "integer",
            },
            addRecord: {
                type: "array",
                items: {
                    type: "string",
                },
            },
            deleteRecord: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: ["name", "operationType"],
    },
];

/**发送注册链事件 */
export const TR_REGISTER_CHAIN: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            genesisBlockPath: {
                type: "string",
            },
        },
        required: ["genesisBlockPath"],
    },
];
/**发送资产交换事件 */
export const TR_TO_EXCHANGE_SPECIAL_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            toExchangeSource: {
                type: "string",
            },
            beExchangeSource: {
                type: "string",
            },
            toExchangeChainName: {
                type: "string",
            },
            beExchangeChainName: {
                type: "string",
            },
            toExchangeAsset: {
                type: "string",
            },
            beExchangeAsset: {
                type: "string",
            },
            exchangeNumber: {
                type: "string",
            },
            exchangeAssetType: {
                type: "integer",
            },
            exchangeDirection: {
                type: "integer",
            },
            ciphertexts: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: [
            "toExchangeSource",
            "beExchangeSource",
            "toExchangeChainName",
            "beExchangeChainName",
            "toExchangeAsset",
            "beExchangeAsset",
            "exchangeNumber",
            "exchangeAssetType",
            "exchangeDirection",
        ],
    },
];
/**发送接受资产交换事件 */
export const TR_BE_EXCHANGE_SPECIAL_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
            ciphertext: {
                type: "string",
            },
        },
        required: ["transactionSignature", "recipientId"],
    },
];
/**发送权益迁出交易 */
export const TR_EMIGRATE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            genesisDelegateSignature: {
                type: "array",
                items: {
                    type: "string",
                },
            },
            amount: {
                type: "string",
            },
        },
        required: ["genesisDelegateSignature", "amount"],
    },
];

/**发送权益迁入交易 */
export const TR_IMMIGRATE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: "object",
        properties: {
            transactionSignature: {
                type: "string",
            },
            genesisDelegateSignature: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        required: ["transactionSignature", "genesisDelegateSignature"],
    },
];
