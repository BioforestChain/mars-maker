import { BASE_ARGS_TYPE } from "./constants";
import { TR_COMMON_PARAM } from "./commonSchema";

/**发送设置安全密码事件 */
export const TR_SIGNATURE: TransactionMaker.SchemaType[] = [
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

/**发送权益发行事件 */
export const TR_ISSUE_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_TRANSFER_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_DESTROY_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_GIFT_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_GRAB_ASSET: TransactionMaker.SchemaType[] = [
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
                required: ["cipherPublicKeys", "assetType", "amount", "totalGrabableTimes", "giftDistributionRule"],
            },
        },
        required: ["blockSignature", "transactionSignature", "giftAsset"],
    },
];
/**发送权益委托事件 */
export const TR_TRUST_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_SIGN_FOR_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_TO_EXCHANGE_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_BE_EXCHANGE_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_DAPP: TransactionMaker.SchemaType[] = [
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
                required: ["newDappid", "type"],
            },
        },
        required: ["dappInfo", "recipientId"],
    },
];
/**发送dapp购买事件 */
export const TR_DAPP_PURCHASING: TransactionMaker.SchemaType[] = [
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
export const TR_MARK: TransactionMaker.SchemaType[] = [
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
export const TR_LOCATION_NAME: TransactionMaker.SchemaType[] = [
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
export const TR_SET_LNS_MANAGER: TransactionMaker.SchemaType[] = [
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
export const TR_SET_LNS_RECORD_VALUE: TransactionMaker.SchemaType[] = [
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
export const TR_REGISTER_CHAIN: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            registerCertificate: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    body: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            version: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            timestamp: {
                                type: BASE_ARGS_TYPE.NUMBER,
                            },
                            genesisBlockInfo: {
                                type: BASE_ARGS_TYPE.OBJECT,
                                properties: {
                                    genesisAccount: {
                                        type: BASE_ARGS_TYPE.OBJECT,
                                        properties: {
                                            address: {
                                                type: BASE_ARGS_TYPE.STRING,
                                            },
                                            publicKey: {
                                                type: BASE_ARGS_TYPE.STRING,
                                            },
                                        },
                                        required: ["address", "publicKey"],
                                    },
                                    genesisBlockSignature: {
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
                                    bnid: {
                                        type: BASE_ARGS_TYPE.STRING,
                                    },
                                    beginEpochTime: {
                                        type: BASE_ARGS_TYPE.NUMBER,
                                    },
                                    genesisLocationName: {
                                        type: BASE_ARGS_TYPE.STRING,
                                    },
                                    blockPerRound: {
                                        type: BASE_ARGS_TYPE.NUMBER,
                                    },
                                    delegates: {
                                        type: BASE_ARGS_TYPE.NUMBER,
                                    },
                                    forgeInterval: {
                                        type: BASE_ARGS_TYPE.NUMBER,
                                    },
                                    genesisDelegates: {
                                        type: BASE_ARGS_TYPE.ARRAY,
                                        items: {
                                            type: BASE_ARGS_TYPE.OBJECT,
                                            properties: {
                                                address: {
                                                    type: BASE_ARGS_TYPE.STRING,
                                                },
                                                publicKey: {
                                                    type: BASE_ARGS_TYPE.STRING,
                                                },
                                            },
                                            required: ["address", "publicKey"],
                                        },
                                        minItems: 1,
                                    },
                                },
                                required: [
                                    "genesisAccount",
                                    "genesisBlockSignature",
                                    "chainName",
                                    "assetType",
                                    "magic",
                                    "bnid",
                                    "beginEpochTime",
                                    "genesisLocationName",
                                    "blockPerRound",
                                    "delegates",
                                    "forgeInterval",
                                    "genesisDelegates",
                                ],
                            },
                        },
                        required: ["version", "timestamp", "genesisBlockInfo"],
                    },
                    publicKey: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    secondPublicKey: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    signature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    signSignature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["body", "publicKey", "signature"],
            },
        },
        required: ["registerCertificate"],
    },
];

/**发送权益迁出交易 */
export const TR_EMIGRATE_ASSET: TransactionMaker.SchemaType[] = [
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
export const TR_IMMIGRATE_ASSET: TransactionMaker.SchemaType[] = [
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

/**发送发行资产权益模板事件 */
export const TR_ISSUE_ENTITY_FACTORY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            factoryInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    factoryId: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFrozenAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    purchaseAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["factoryId", "entityPrealnum"],
            },
        },
        required: ["factoryInfo", "recipientId"],
    },
];

/**发送发行资产权益事件 */
export const TR_ISSUE_ENTITY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            entityInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    entityId: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactoryPossessor: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactory: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            sourceChainName: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            sourceChainMagic: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            factoryId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityFrozenAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            purchaseAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["factoryId", "entityPrealnum", "entityFrozenAssetPrealnum", "purchaseAssetPrealnum"],
                    },
                },
                required: ["entityId", "entityFactoryPossessor", "entityFactory"],
            },
        },
        required: ["entityInfo"],
    },
];

/**发送销毁资产权益事件 */
export const TR_DESTROY_ENTITY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            entityInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    transactionSignature: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityId: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactoryApplicant: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactoryPossessor: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactory: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            sourceChainName: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            sourceChainMagic: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            factoryId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityFrozenAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            purchaseAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["factoryId", "entityPrealnum", "entityFrozenAssetPrealnum", "purchaseAssetPrealnum"],
                    },
                },
                required: ["transactionSignature", "entityId", "entityFactoryApplicant", "entityFactoryPossessor", "entityFactory"],
            },
        },
        required: ["entityInfo"],
    },
];

/**发送资产交换事件 */
export const TR_TO_EXCHANGE_ANY: TransactionMaker.SchemaType[] = [
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
                    toExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    toExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["toExchangeParentAssetType", "toExchangeAssetType", "toExchangeAssetPrealnum"],
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
                    beExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    beExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["beExchangeParentAssetType", "beExchangeAssetType"],
            },
            assetExchangeWeightRatio: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    toExchangeAssetWeight: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetWeight: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
            },
            taxInformation: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    taxCollector: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["taxCollector", "taxAssetPrealnum"],
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["toExchangeInfo", "beExchangeInfo"],
    },
];

/**发送接受资产交换事件 */
export const TR_BE_EXCHANGE_ANY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            toExchangeAssetPrealnum: {
                type: BASE_ARGS_TYPE.STRING,
            },
            beExchangeAssetPrealnum: {
                type: BASE_ARGS_TYPE.STRING,
            },
            exchangeAny: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
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
                    toExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    beExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    toExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    toExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    assetExchangeWeightRatio: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            toExchangeAssetWeight: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            beExchangeAssetWeight: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
                    },
                    taxInformation: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            taxCollector: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            taxAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["taxCollector", "taxAssetPrealnum"],
                    },
                    cipherPublicKeys: {
                        type: "array",
                        items: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                    },
                },
                required: [
                    "cipherPublicKeys",
                    "toExchangeParentAssetType",
                    "beExchangeParentAssetType",
                    "toExchangeAssetType",
                    "beExchangeAssetType",
                    "toExchangeAssetPrealnum",
                ],
            },
            taxInformation: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    taxCollector: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["taxCollector", "taxAssetPrealnum"],
            },
            ciphertext: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["transactionSignature", "toExchangeAssetPrealnum", "beExchangeAssetPrealnum", "exchangeAny", "recipientId"],
    },
];

/**发送任意资产转移事件 */
export const TR_TRANSFER_ANY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    parentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["parentAssetType", "assetType", "amount"],
            },
            taxInformation: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    taxCollector: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["taxCollector", "taxAssetPrealnum"],
            },
        },
        required: ["recipientId", "assetInfo"],
    },
];

/**发送任意资产赠与事件 */
export const TR_GIFT_ANY: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    parentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["parentAssetType", "assetType", "amount"],
            },
            totalGrabableTimes: {
                type: BASE_ARGS_TYPE.NUMBER,
            },
            numberOfBeginUnfrozenBlocks: {
                type: BASE_ARGS_TYPE.NUMBER,
            },
            giftDistributionRule: {
                type: BASE_ARGS_TYPE.NUMBER,
            },
            taxInformation: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    taxCollector: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                },
                required: ["taxCollector", "taxAssetPrealnum"],
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["assetInfo"],
    },
];

/**发送接受任意资产赠与事件 */
export const TR_GRAB_ANY: TransactionMaker.SchemaType[] = [
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
            amount: {
                type: BASE_ARGS_TYPE.STRING,
            },
            giftAny: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    sourceChainMagic: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    sourceChainName: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    parentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    assetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    amount: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    totalGrabableTimes: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    beginUnfrozenBlockHeight: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    giftDistributionRule: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    taxInformation: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            taxCollector: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            taxAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["taxCollector", "taxAssetPrealnum"],
                    },
                    cipherPublicKeys: {
                        type: "array",
                        items: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                    },
                },
                required: ["parentAssetType", "assetType", "amount", "totalGrabableTimes", "cipherPublicKeys"],
            },
        },
        required: ["blockSignature", "transactionSignature", "giftAny", "recipientId"],
    },
];

/**发送发行资产权益事件 */
export const TR_ISSUE_ENTITY_MULTI_V1: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            entityInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    entityStructList: {
                        type: BASE_ARGS_TYPE.ARRAY,
                        items: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                entityId: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["entityId"],
                        },
                        minItems: 1,
                    },
                    entityFactoryPossessor: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    entityFactory: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            sourceChainName: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            sourceChainMagic: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            factoryId: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            entityFrozenAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            purchaseAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["factoryId", "entityPrealnum", "entityFrozenAssetPrealnum", "purchaseAssetPrealnum"],
                    },
                },
                required: ["entityStructList", "entityFactoryPossessor", "entityFactory"],
            },
        },
        required: ["entityInfo"],
    },
];

/**发送批量任意资产交换事件 */
export const TR_TO_EXCHANGE_ANY_MULTI: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            toExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        toExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        toExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        assetExchangeWeightRatio: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                toExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                beExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["toExchangeParentAssetType", "toExchangeAssetType", "toExchangeAssetPrealnum"],
                },
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
                    beExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    beExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxInformation: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            taxCollector: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            taxAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["taxCollector", "taxAssetPrealnum"],
                    },
                },
                required: ["beExchangeParentAssetType", "beExchangeAssetType"],
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["toExchangeInfos", "beExchangeInfo"],
    },
];

/**发送接受批量任意资产交换事件 */
export const TR_BE_EXCHANGE_ANY_MULTI: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            toExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        toExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        toExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        assetExchangeWeightRatio: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                toExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                beExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["toExchangeParentAssetType", "toExchangeAssetType", "toExchangeAssetPrealnum"],
                },
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
                    beExchangeParentAssetType: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                    beExchangeAssetType: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    beExchangeAssetPrealnum: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    taxInformation: {
                        type: BASE_ARGS_TYPE.OBJECT,
                        properties: {
                            taxCollector: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                            taxAssetPrealnum: {
                                type: BASE_ARGS_TYPE.STRING,
                            },
                        },
                        required: ["taxCollector", "taxAssetPrealnum"],
                    },
                },
                required: ["beExchangeParentAssetType", "beExchangeAssetType"],
            },
            ciphertext: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["toExchangeInfos", "beExchangeInfo", "recipientId"],
    },
];

/**发送批量全量任意资产交换事件 */
export const TR_TO_EXCHANGE_ANY_MULTI_ALL: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            toExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        toExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        toExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        assetExchangeWeightRatio: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                toExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                beExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["toExchangeParentAssetType", "toExchangeAssetType", "toExchangeAssetPrealnum"],
                },
                minItems: 1,
            },
            beExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        beExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        beExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["beExchangeParentAssetType", "beExchangeAssetType"],
                },
                minItems: 1,
            },
            ciphertexts: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.STRING,
                },
            },
        },
        required: ["toExchangeInfos", "beExchangeInfos"],
    },
];

/**发送接受批量全量任意资产交换事件 */
export const TR_BE_EXCHANGE_ANY_MULTI_ALL: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            transactionSignature: {
                type: BASE_ARGS_TYPE.STRING,
            },
            toExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        toExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        toExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        toExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        assetExchangeWeightRatio: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                toExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                beExchangeAssetWeight: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["toExchangeAssetWeight", "beExchangeAssetWeight"],
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["toExchangeParentAssetType", "toExchangeAssetType", "toExchangeAssetPrealnum"],
                },
                minItems: 1,
            },
            beExchangeInfos: {
                type: BASE_ARGS_TYPE.ARRAY,
                items: {
                    type: BASE_ARGS_TYPE.OBJECT,
                    properties: {
                        beExchangeSource: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeChainName: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeParentAssetType: {
                            type: BASE_ARGS_TYPE.NUMBER,
                        },
                        beExchangeAssetType: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        beExchangeAssetPrealnum: {
                            type: BASE_ARGS_TYPE.STRING,
                        },
                        taxInformation: {
                            type: BASE_ARGS_TYPE.OBJECT,
                            properties: {
                                taxCollector: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                                taxAssetPrealnum: {
                                    type: BASE_ARGS_TYPE.STRING,
                                },
                            },
                            required: ["taxCollector", "taxAssetPrealnum"],
                        },
                    },
                    required: ["beExchangeParentAssetType", "beExchangeAssetType"],
                },
                minItems: 1,
            },
            ciphertext: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["toExchangeInfos", "beExchangeInfos", "recipientId"],
    },
];

/**发送发行凭证事件 */
export const TR_ISSUE_CERTIFICATE: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            certificateInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    certificateId: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    type: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                },
                required: ["certificateId", "type"],
            },
        },
        required: ["certificateInfo"],
    },
];

/**发送销毁凭证事件 */
export const TR_DESTROY_CERTIFICATE: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            certificateInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    certificateId: {
                        type: BASE_ARGS_TYPE.STRING,
                    },
                    type: {
                        type: BASE_ARGS_TYPE.NUMBER,
                    },
                },
                required: ["certificateId", "type"],
            },
        },
        required: ["certificateInfo"],
    },
];

/**发送增发权益事件 */
export const TR_INCREASE_ASSET: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    increasedAssetPrealnum: {
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
                required: ["increasedAssetPrealnum", "assetType"],
            },
            frozenMainAssetPrealnum: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["assetInfo", "frozenMainAssetPrealnum"],
    },
];

/**发送质押权益事件 */
export const TR_STAKE_ASSET: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    assetPrealnum: {
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
                required: ["assetPrealnum"],
            },
            stakeId: {
                type: BASE_ARGS_TYPE.STRING,
            },
            numberOfUnstakeHeight: {
                type: BASE_ARGS_TYPE.NUMBER,
            },
        },
        required: ["assetInfo", "stakeId", "numberOfUnstakeHeight"],
    },
];

/**发送解除质押权益事件 */
export const TR_UNSTAKE_ASSET: TransactionMaker.SchemaType[] = [
    TR_COMMON_PARAM,
    {
        type: BASE_ARGS_TYPE.OBJECT,
        properties: {
            assetInfo: {
                type: BASE_ARGS_TYPE.OBJECT,
                properties: {
                    assetPrealnum: {
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
                required: ["assetPrealnum"],
            },
            stakeId: {
                type: BASE_ARGS_TYPE.STRING,
            },
        },
        required: ["assetInfo", "stakeId"],
    },
];
