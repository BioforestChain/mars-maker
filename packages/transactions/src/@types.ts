declare namespace BFChainPcSdk {
    namespace Transaction {
        type TransactionFactory<T extends BFChainCore.Transaction> = import("./atom_transaction/_transactionFactory").TransactionFactory<T>;

        /**交易通用参数 */
        interface TransactionCommonParams {
            /**发起账户的密钥 */
            secret: string;
            /**发起账户的二次密钥 */
            secondSecretInfo?: BFChainCoreTools.SecondSecretInfo;
            /**事件的接收账户地址，base58 编码的 16 进制字符串 */
            recipientId?: string;
            /**事件的接收范围类型，只能是 0，1，2，4 中的某一个，0 表示不限定操作范围，1 表示只有指定的账户地址才能对这笔事件进行操作，2 表示只有指定的 dappid 才能对这笔事件进行操作，4 表示只有指定的位名才能对这笔事件进行操作，默认为 0 */
            rangeType?: number;
            /**事件的接收范围，当 rangeType 为 0 时，不能填写任何数据，当 rangeType 为 1 时，只能填写账户地址，当 rangeType 为 2 时，只能填写 dappid，当 rangeType 为 4 时，只能填写位名，默认为空 */
            range?: string[];
            /**事件的手续费 */
            fee: string;
            /**事件的发起高度，0-9 组成并且不包含小点，可选，默认使用当前区块链的最新高度 */
            applyBlockHeight: number;
            /**事件备注信息，默认为空 */
            remark?: { [key: string]: string };
            /**事件所属的 dappid，大写字母或数字，8 个字符，默认为空 */
            dappid?: string;
            /**事件所属的位名，2-1024 个字符，每级位名最大长度为 128 个字符，一级位名只能时小写字母组成，二级及以上开头及结尾只能由小写字母或数字组成，中间可以包含下划线，根位名必须时本链链名，可选，默认为空 */
            lns?: string;
            /**事件的来源IP，IPv4或者IPv6，不包含头尾(例如: 127.0.0.1)，默认为空 */
            sourceIP?: string;
            /**事件的来源链网络标识符，大写字母或数字组成，5 个字符，默认使用创世块的 magic */
            fromMagic?: string;
            /**事件的去往链网络标识符，大写字母或数字组成，5 个字符，默认使用创世块的 magic */
            toMagic?: string;
            /**事件的过期区块间隔，默认使用创世块最大过期时间参数，0-9 组成并且不包含小数点 */
            numberOfEffectiveBlocks?: number;
            /**账户上一轮信息 */
            accountLastRoundInfo?: {
                /**交易量 */
                txCount: number;
                /**权益数 */
                equity: string;
            };
        }

        type TransactionCommonParamsWithRecipientId = TransactionCommonParams & { recipientId: string };
        type TransactionCommonParamsWithoutRecipientId = Omit<TransactionCommonParams, "recipientId">;

        interface UsernameTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            /**用户名字符串，大小写字母、数字、下划线组成，1-20 个字符，不能包含当前链的名称 */
            alias: string;
        }
        interface SignatureTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            /**新的安全密码 */
            newSecondSecretInfo: BFChainCoreTools.SecondSecretInfo;
        }
        interface DelegateTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface AcceptVoteTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface RejectVoteTransactionParams extends TransactionCommonParamsWithoutRecipientId {}
        interface VoteTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**投出的权益数，0-9 组成并且不包含小数点，允许为 0 */
            equity: string;
        }

        interface IssueAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                /**发行的权益名，大写字母组成，3-5 个字符 */
                assetType: string;
                /**发行的新权益总数，权益数量由0-9共十个数字组成，权益数量不包含小数点且必须大于0 */
                expectedIssuedAssets: string;
            };
        }
        interface TransferAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                /**转移的权益所属链网络标识符，大写字母或数字组成，5 个字符，最后一位是校验位 */
                sourceChainMagic?: string;
                /**转移的权益所属链名，小写字母组成，3-8 位 */
                sourceChainName?: string;
                /**转移的权益类型，大写字母组成，3-5 个字符 */
                assetType?: string;
                /**转移的权益数量，0-9 组成并且不包含小数点，必须大于 0 */
                amount: string;
            };
        }
        interface DestoryAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                /**销毁的权益名，大写字母组成，3-5 个字符 */
                assetType: string;
                /**销毁的权益数，0-9 组成并且不包含小数点，必须大于 0 */
                amount: string;
            };
        }
        interface GiftAssetTransactionParams extends TransactionCommonParams {
            assetInfo: {
                /**赠送的权益所属链网络标识符，大写字母或数字组成，5 个字符，最后一位是校验位 */
                sourceChainMagic?: string;
                /**赠送的权益所属链名，小写字母组成，3-8 位 */
                sourceChainName?: string;
                /**赠送的权益类型，大写字母组成，3-5 个字符 */
                assetType?: string;
                /**赠送的权益数量，0-9 组成并且不包含小数点，必须大于 0 */
                amount: string;
            };
            /**可被接收的次数，0-9 组成并且不包含小数点，必须大于 0 */
            totalGrabableTimes: number;
            /**接收规则, 只能为 0，1 或 2，0 表示平均分配，1 表示根据任意账户的地址的随机分配，2 表示根据接收者列表中账户地址的随机分配 */
            giftDistributionRule: BFChainCore.GIFT_DISTRIBUTION_RULE;
            /**从权益赠送事件发起到开始被签收的区块间隔，0-9 组成并且不包含小数点，可选，必须小于等于事件的有效期 */
            numberOfBeginUnfrozenBlocks?: number;
            /**加密密钥组，如果填写了密钥，则接收权益交换的事件必须携带某个密钥生成的签名对 */
            ciphertexts?: string[];
        }
        interface GrabAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**赠送事件所在的区块签名，128 个字节的 16 进制字符串 */
            blockSignature: string;
            /**赠送事件的签名，128 个字节的 16 进制字符串 */
            transactionSignature: string;
            /**权益赠送信息 */
            giftAsset: BFChainCore.GiftAssetJSON;
            /**加密密钥，如果权益赠送事件填写了加密密钥，则必须携带某个权益交换事件指定密钥以生成密钥签名对 */
            ciphertext?: string;
        }
        interface TrustAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            assetInfo: {
                /**委托权益所属链网络标识符，大写字母或数字组成，5 个字符，最后一位是校验位 */
                sourceChainMagic?: string;
                /**委托权益所属链名，小写字母组成，3-8 位 */
                sourceChainName?: string;
                /**委托权益类型，大写字母组成，3-5 个字符 */
                assetType?: string;
                /**委托的权益数量，0-9 组成并且不包含小数点，必须大于 0 */
                amount: string;
            };
            /**签收时需要的委托人签名数量，0-9 组成，必须大于 0，最大值为指定的受托人数量 +2 */
            numberOfSignFor: number;
            /**指定的委托人地址数组，base58 编码的 16 进制字符串 */
            trustees: string[];
        }
        interface SignForAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**委托事件的签名，128 个字节的 16 进制字符串 */
            transactionSignature: string;
            /**委托权益的账户地址 */
            trustSenderId: string;
            /**委托权益信息 */
            trustAsset: BFChainCore.TrustAssetJSON;
        }
        interface ToExchangeAssetTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            toExchangeInfo: {
                /**用于交换的资产/权益来源链网络标识符，大写字母或数字组成，5 个字符，最后一位是校验位 */
                toExchangeSource?: string;
                /**用于交换的资产/权益来源链名，小写字母组成，3-8 位 */
                toExchangeChainName?: string;
                /**用于交换的权益名，可能为 dappid，位名或者权益名 */
                toExchangeAsset: string;
                /**用于交换或交换得到的权益数量，0-9 组成并且不包含小数点 */
                toExchangeNumber: string;
            };
            beExchangeInfo: {
                /**被交换的资产/权益来源链网络标识符，大写字母或数字组成，5个字符，最后一位是校验位 */
                beExchangeSource?: string;
                /**被交换的资产/权益来源链名，小写字母组成，3-8 位 */
                beExchangeChainName?: string;
                /**被交换的资产/权益名，可能为 dappid，位名或者权益名 */
                beExchangeAsset: string;
            };
            /**权益交换比例 */
            exchangeRate: {
                /**权益的交换比例的分母，为正整数。被交换权益数=用于交换权益数*交换比例=toExchangeNumber * nextWeight / prevWeight */
                prevWeight: string;
                /**权益的交换比例的分子，为正整数。被交换权益数=用于交换权益数*交换比例=toExchangeNumber * nextWeight / prevWeight */
                nextWeight: string;
            };
            /**加密密钥组，如果填写了密钥，则接收权益交换的事件必须携带某个密钥生成的签名对 */
            ciphertexts?: string[];
        }
        interface BeExchangeAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**权益交换事件的签名，128 个字节的 16 进制字符串 */
            transactionSignature: string;
            /**交换得到的权益数量，权益数量由0-9共十个数字组成，权益数量不包含小数点且必须大于0 */
            toExchangeNumber: string;
            /**权益交换信息 */
            exchangeAsset: BFChainCore.ToExchangeAssetJSON;
            /**加密密钥，如果权益交换事件填写了加密密钥，则必须携带某个权益交换事件指定密钥以生成密钥签名对 */
            ciphertext?: string;
        }
        interface DAppTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                /**不包含校验位的 dappid，大写字母或数字组成，7 个字符 */
                newDappid: string;
                /**dappid 的类型，只能为 0 或 1，0 表示这个 dappid 是付费使用的，1 表示这个 dappid 是免费使用的 */
                type: BFChainCore.DAPP_TYPE;
                /**购买 dappid 使用权需要的权益数量(如果 dappid 是付费应用则必须携带，如果是免费应用则无需携带)，0-9 组成并且不包含小数点，必须大于 0 */
                purchanseAsset?: string;
            };
        }
        interface DAppPurchasingTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                /**含校验位的 dappid，大写字母或数字组成，8 个字符，最后一位是校验位 */
                dappid: string;
                /**dappid 的类型，只能为 0 或 1，0 表示这个 dappid 是付费使用的，1 表示这个 dappid 是免费使用的 */
                type: BFChainCore.DAPP_TYPE;
                /**购买 dappid 使用权需要的权益数量(如果 dappid 是付费应用则必须携带，如果是免费应用则无需携带)，0-9 组成并且不包含小数点，必须大于 0 */
                purchanseAsset?: string;
            };
        }
        interface MarkTransactionParams extends TransactionCommonParamsWithRecipientId {
            dappInfo: {
                /**含校验位的 dappid，大写字母或数字组成，8 个字符，最后一位是校验位 */
                dappid: string;
                /**dappid 的类型，只能为 0 或 1，0 表示这个 dappid 是付费使用的，1 表示这个 dappid 是免费使用的 */
                type: BFChainCore.DAPP_TYPE;
                /**购买 dappid 使用权需要的权益数量(如果 dappid 是付费应用则必须携带，如果是免费应用则无需携带)，0-9 组成并且不包含小数点，必须大于 0 */
                purchanseAsset?: string;
            };
            /**存证内容，为任意字符串 */
            content: string;
            /**存证类型，为任意字符串，用于区别存证 */
            action: string;
        }
        interface LocationNameTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**位名，2-1024 个字符，每级位名最大长度为 128 个字符，一级位名只能是小写字母组成，二级及以上开头及结尾只能由小写字母或数字组成，中间可以包含下划线，根位名必须时本链链名 */
            name: string;
            /**操作类型，只能是 0 或 1，0 表示注册位名，1 表示注销位名 */
            operationType: BFChainCore.LOCATION_NAME_OPERATION_TYPE;
        }
        interface SetLnsManagerTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**位名，2-1024 个字符，每级位名最大长度为 128 个字符，一级位名只能是小写字母组成，二级及以上开头及结尾只能由小写字母或数字组成，中间可以包含下划线，根位名必须时本链链名 */
            name: string;
        }
        interface SetLnsRecordValueTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            /**位名，2-1024 个字符，每级位名最大长度为 128 个字符，一级位名只能是小写字母组成，二级及以上开头及结尾只能由小写字母或数字组成，中间可以包含下划线，根位名必须时本链链名 */
            name: string;
            /**操作类型，只能为 0 或 1 或 2，0 表示添加，1 表示删除，2 表示更新 */
            operationType: BFChainCore.RECORD_OPERATION_TYPE;
            /**增加的解析值，解析值的类型只能为 1 或 2 或 3 或 4 或 0，1 表示 ipV4，2 表示 ipV6，3 表示经纬度，4 表示链上账户地址，0 表示自定义的任意类型，可选，操作类型为 0 或 2 时必填 */
            addRecord?: BFChainCore.LocationNameRecordJSON;
            /**删除的解析值，解析值的类型只能为 1 或 2 或 3 或 4 或 0，1 表示 ipV4，2 表示 ipV6，3 表示经纬度，4 表示链上账户地址，0 表示自定义的任意类型，可选，操作类型为 1 或 2 时必填 */
            deleteRecord?: BFChainCore.LocationNameRecordJSON;
        }
        interface ToExchangeSpecialAssetTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            toExchangeInfo: {
                /**用于交换的资产/权益来源链网络标识符，大写字母或数字组成，5 个字符，最后一位是校验位 */
                toExchangeSource?: string;
                /**用于交换的资产/权益来源链名，小写字母组成，3-8 位 */
                toExchangeChainName?: string;
                /**用于交换的权益名，可能为 dappid，位名或者权益名 */
                toExchangeAsset: string;
            };
            beExchangeInfo: {
                /**被交换的资产/权益来源链网络标识符，大写字母或数字组成，5个字符，最后一位是校验位 */
                beExchangeSource?: string;
                /**被交换的资产/权益来源链名，小写字母组成，3-8 位 */
                beExchangeChainName?: string;
                /**被交换的资产/权益名，可能为 dappid，位名或者权益名 */
                beExchangeAsset: string;
            };
            /**用于交换或交换得到的权益数量，0-9 组成并且不包含小数点 */
            exchangeNumber: string;
            /**资产的类型，只能为 0 或 1，0 为 dappid，1 为位名 */
            exchangeAssetType: number;
            /**资产的来源，只能为 0 或 1，0 为出售，1 为求购 */
            exchangeDirection: number;
            /**加密密钥组，如果填写了密钥，则接收资产交换的事件必须携带某个密钥生成的签名对 */
            ciphertexts?: string[];
        }
        interface BeExchangeSpecialAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**资产交换事件的签名，128 个字节的 16 进制字符串 */
            transactionSignature: string;
            /**资产交换信息 */
            exchangeSpecialAsset: BFChainCore.ToExchangeSpecialAssetJSON;
            /**加密密钥，如果资产交换事件填写了加密密钥，则必须携带某个资产交换事件指定密钥以生成密钥签名对 */
            ciphertext?: string;
        }

        interface RegisterChainTransactionParams extends TransactionCommonParamsWithoutRecipientId {
            /**创世块 */
            genesisBlock: BFChainCore.GenesisBlockJSON;
        }

        interface EmigrateAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**携带迁出授权签名的凭证 */
            migrateCertificate: BFChainCore.CrossChain.MigrateCertificateJSON;
        }

        interface ImmigrateAssetTransactionParams extends TransactionCommonParamsWithRecipientId {
            /**携带迁出、迁入授权签名的凭证 */
            migrateCertificate: BFChainCore.CrossChain.MigrateCertificateJSON;
        }
    }

    namespace CrossChain {
        type MigrateCertificateFactory = import("./migrate_certificate/_migrateCertificateFactory").MigrateCertificateFactory;

        type MigrateCertificateArgs = BFChainCore.CrossChain.GenerateMigrateCertificateArgs | BFChainCore.CrossChain.AuthSignMigrateCertificateArgs;
    }

    namespace Common {
        interface CommonParams {}

        interface VerifyAddressParams extends CommonParams {
            address: string;
        }

        interface VerifyPublicKeyParams extends CommonParams {
            publicKey: string;
        }

        interface GenerateAccountParams extends CommonParams {
            secret: string;
            secondSecret?: string;
        }

        interface GenerateAddressBySecretParams extends CommonParams {
            secret: string;
        }

        interface GenerateAddressByPublicKeyParams extends CommonParams {
            publicKey: string;
        }

        interface AccountInfo {
            address: string;
            publicKey: string;
            secondPublicKey?: string;
        }

        type CommonFactory = import("./atom_common/_commonFactory").CommonFactory<any>;
    }
}
