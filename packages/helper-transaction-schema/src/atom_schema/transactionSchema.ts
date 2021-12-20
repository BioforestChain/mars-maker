import { BASE_ARGS_TYPE } from "./constants";
import { TR_COMMON_PARAM } from "./commonSchema";

/**发送设置用户名事件 */
export const TR_USERNAME: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            alias: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["alias"],
    },
];
/**发送设置安全密码事件 */
export const TR_SIGNATURE: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            newSecondSecretInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    useOld: {
                        type: BASE_ARGS_TYPE.BOOLEAN,
                    },
                    secondSecret: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["useOld", "secondSecret"],
            },
        },
        required: ["newSecondSecretInfo"],
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
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            equity: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["equity", "recipientId"],
    },
];

/**发送权益发行事件 */
export const TR_ISSUE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    expectedIssuedAssets: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["assetType", "expectedIssuedAssets"],
            },
        },
        required: ["assetInfo", "recipientId"],
    },
];
/**发送转账事件 */
export const TR_TRANSFER_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["amount"],
            },
        },
        required: ["assetInfo", "recipientId"],
    },
];
/**发送权益销毁事件 */
export const TR_DESTORY_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["amount", "assetType"],
            },
        },
        required: ["assetInfo"],
    },
];
/**发送权益赠与事件（红包事件） */
export const TR_GIFT_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["amount"],
            },
            totalGrabableTimes: {
                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
            },
            numberOfBeginUnfrozenBlocks: {
                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
            },
            giftDistributionRule: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["assetInfo", "totalGrabableTimes", "giftDistributionRule"],
    },
];
/**发送接受权益赠与事件（抢红包事件） */
export const TR_GRAB_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            blockSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            giftAsset: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    cipherPublicKeys: {
                        type: BASE_ARGS_TYPE.ARRAY,
                        items: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    totalGrabableTimes: {
                        type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                    },
                    giftDistributionRule: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                },
                required: ["cipherPublicKeys", "sourceChainMagic", "sourceChainName", "assetType", "amount", "totalGrabableTimes", "giftDistributionRule"],
            },
        },
        required: ["blockSignature", "transactionSignature", "giftAsset"],
    },
];
/**发送权益委托事件 */
export const TR_TRUST_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            trustees: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
            numberOfSignFor: {
                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
            },
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["amount"],
            },
        },
        required: ["trustees", "numberOfSignFor", "assetInfo", "recipientId"],
    },
];
/**发送签收权益委托事件 */
export const TR_SIGN_FOR_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["transactionSignature"],
    },
];
/**发送权益交换事件 */
export const TR_TO_EXCHANGE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            toExchangeInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    toExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeNumber: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["toExchangeAsset", "toExchangeNumber"],
            },
            beExchangeInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    beExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["beExchangeAsset"],
            },
            exchangeRate: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    prevWeight: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    nextWeight: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["prevWeight", "nextWeight"],
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["toExchangeInfo", "beExchangeInfo", "exchangeRate"],
    },
];
/**发送接受权益交换事件 */
export const TR_BE_EXCHANGE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            toExchangeNumber: {
                type: BASE_ARGS_TYPE.STRING,
            },
            exchangeAsset: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    cipherPublicKeys: {
                        type: BASE_ARGS_TYPE.ARRAY,
                        items: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                    },
                    toExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeNumber: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    exchangeRate: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            prevWeight: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            nextWeight: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["prevWeight", "nextWeight"],
                    },
                },
                required: [
                    "cipherPublicKeys",
                    "toExchangeSource",
                    "beExchangeSource",
                    "toExchangeChainName",
                    "beExchangeChainName",
                    "toExchangeAsset",
                    "beExchangeAsset",
                    "toExchangeNumber",
                    "exchangeRate",
                ],
            },
            ciphertext: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["transactionSignature", "toExchangeNumber", "exchangeAsset", "recipientId"],
    },
];

/**发送发行dapp事件 */
export const TR_DAPP: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            dappInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    newDappid: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    type: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    purchanseAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["newDappid", "type", "purchanseAsset"],
            },
        },
        required: ["dappInfo", "recipientId"],
    },
];
/**发送dapp购买事件 */
export const TR_DAPP_PURCHASING: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            dappInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    dappid: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    type: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    purchanseAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["dappid", "type"],
            },
        },
        required: ["dappInfo"],
    },
];
/**发送存证事件 */
export const TR_MARK: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            dappInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    dappid: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    type: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    purchanseAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["dappid", "type"],
            },
            content: {
                type: BASE_ARGS_TYPE.STRING,
            },
            action: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["dappInfo", "content", "action"],
    },
];
/**发送注册、注销位名事件 */
export const TR_LOCATION_NAME: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            name: {
                type: BASE_ARGS_TYPE.STRING,
            },
            operationType: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
        },
        required: ["name", "operationType", "recipientId"],
    },
];
/**发送设置位名管理员事件 */
export const TR_SET_LNS_MANAGER: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            name: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["name", "recipientId"],
    },
];
/**发送设置位名解析值事件 */
export const TR_SET_LNS_RECORD_VALUE: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            name: {
                type: BASE_ARGS_TYPE.STRING,
            },
            operationType: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            addRecord: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    recordType: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    recordValue: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
            },
            deleteRecord: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    recordType: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    recordValue: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
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
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            genesisBlock: {
                type: BASE_ARGS_TYPE.OBJECT,
            },
        },
        required: ["genesisBlock"],
    },
];
/**发送资产交换事件 */
export const TR_TO_EXCHANGE_SPECIAL_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            toExchangeInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    toExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["toExchangeAsset"],
            },
            beExchangeInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    beExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["beExchangeAsset"],
            },
            exchangeNumber: {
                type: BASE_ARGS_TYPE.STRING,
            },
            exchangeAssetType: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            exchangeDirection: {
                type: BASE_ARGS_TYPE.NATURALNUMBER,
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["toExchangeInfo", "beExchangeInfo", "exchangeNumber", "exchangeAssetType", "exchangeDirection"],
    },
];
/**发送接受资产交换事件 */
export const TR_BE_EXCHANGE_SPECIAL_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            exchangeSpecialAsset: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    cipherPublicKeys: {
                        type: BASE_ARGS_TYPE.ARRAY,
                        items: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                    },
                    toExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeSource: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAsset: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    exchangeNumber: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    exchangeAssetType: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                    exchangeDirection: {
                        type: BASE_ARGS_TYPE.NATURALNUMBER,
                    },
                },
                required: [
                    "cipherPublicKeys",
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
            ciphertext: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["transactionSignature", "exchangeSpecialAsset", "recipientId"],
    },
];
/**发送权益迁出交易 */
export const TR_EMIGRATE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            migrateCertificate: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    body: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            version: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            timestamp: {
                                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                                minimum: 1,
                            },
                            fromChainId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            toChainId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            fromId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            toId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            assetId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            assetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["version", "fromId", "toId", "timestamp", "fromChainId", "toChainId", "assetId", "assetPrealnum"],
                    },
                    signature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    fromAuthSignature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["body", "signature", "fromAuthSignature"],
            },
        },
        required: ["migrateCertificate"],
    },
];

/**发送权益迁入交易 */
export const TR_IMMIGRATE_ASSET: BFChainPcSdk.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            migrateCertificate: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    body: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            version: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            timestamp: {
                                type: BASE_ARGS_TYPE.POSITIVEINTEGER,
                                minimum: 1,
                            },
                            fromChainId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            toChainId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            fromId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            toId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            assetId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            assetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["version", "fromId", "toId", "timestamp", "fromChainId", "toChainId", "assetId", "assetPrealnum"],
                    },
                    signature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    fromAuthSignature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toAuthSignature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["body", "signature", "fromAuthSignature", "toAuthSignature"],
            },
        },
        required: ["migrateCertificate"],
    },
];
