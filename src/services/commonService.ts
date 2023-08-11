import { BFChainCore, Transaction, BLOB_IN_TRS_REMARK_PREFIX } from "@bfchain/core";
import { Injectable, Inject, getHexFromArrayBuffer, parseHexToArrayBuffer, Aborter, sleep } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { ChainCore } from "../chainCore";
import { Config } from "../config";
import { INJECT_MODULE } from "../constants";
import { Route } from "../decorators";

@Injectable()
export class CommonService {
    @Inject(INJECT_MODULE.CONFIG)
    public config!: Config;
    @Inject(INJECT_MODULE.CORE)
    public bfchainCore!: BFChainCore;
    @Inject(INJECT_MODULE.CHAIN_CORE)
    public chainCore!: ChainCore;

    /**
     * 获取事件服务器信息
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.TRANSACTION_MAKER_INFO)
    async transactionMakerServerInfo(request: TransactionMaker.Common.CommonParams) {
        return {
            version: process.env["VERSION"] || "",
            coreVersion: process.env["CORE_VERSION"] || "",
            supportChain: this.bfchainCore.config.chainName || "",
        };
    }

    /**
     * 非对称加密
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.ASYMMETRIC_ENCRYPT)
    async asymmetricEncrypt(request: TransactionMaker.Common.AsymmetricEncryptParams) {
        const result = await this.bfchainCore.asymmetricHelper.asymmetricEncrypt(
            parseHexToArrayBuffer(request.msg),
            parseHexToArrayBuffer(request.decryptPK),
            parseHexToArrayBuffer(request.encryptSK)
        );

        return {
            nonce: getHexFromArrayBuffer(result.nonce),
            encryptedMessage: getHexFromArrayBuffer(result.encryptedMessage),
        };
    }

    /**
     * 非对称解密
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.ASYMMETRIC_DECRYPT)
    async asymmetricDecrypt(request: TransactionMaker.Common.AsymmetricDecryptParams) {
        const result = await this.bfchainCore.asymmetricHelper.asymmetricDecrypt(
            parseHexToArrayBuffer(request.encryptedMessage),
            parseHexToArrayBuffer(request.encryptPK),
            parseHexToArrayBuffer(request.decryptSK),
            parseHexToArrayBuffer(request.nonce)
        );

        if (typeof result === "boolean") {
            return result;
        }

        return getHexFromArrayBuffer(result);
    }

    /**
     * 计算事件最小手续费
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.CALC_TRANSACTION_MIN_FEE)
    async calcTransactionMinFee(request: TransactionMaker.Common.CalcTransactionMinFeeParams) {
        const transaction =
            request.transaction instanceof Transaction ? request.transaction : await this.bfchainCore.transaction.recombineTransaction(request.transaction);
        const minFee = this.bfchainCore.transactionHelper.calcTransactionMinFee(transaction, undefined, request.customMinFeePerByte).toString();

        return {
            minFee,
        };
    }

    /**
     * 创建账户
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_ACCOUNT)
    async generateAccount(request: TransactionMaker.Common.GenerateAccountParams) {
        const { secret, secondSecret } = request;
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(secret);
        const publicKey = getHexFromArrayBuffer(keypair.publicKey);
        const address = await accountBaseHelper.getAddressFromPublicKey(keypair.publicKey);
        const accountInfo: TransactionMaker.Common.AccountInfo = {
            address,
            publicKey,
        };
        if (secondSecret) {
            const secondKeypair = await accountBaseHelper.createSecondSecretKeypairV2(secret, secondSecret);
            accountInfo.secondPublicKey = getHexFromArrayBuffer(secondKeypair.publicKey);
        }
        return accountInfo;
    }

    /**
     * 根据公钥字符串生成地址(base58)
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_ADDRESS_BY_PUBLICKEY)
    async getAddressFromPublicKeyString(request: TransactionMaker.Common.GenerateAddressByPublicKeyParams) {
        const address = await this.bfchainCore.accountBaseHelper.getAddressFromPublicKeyString(request.publicKey);
        return address;
    }

    /**
     * 根据主密码生成地址(base58)
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_ADDRESS_BY_SECRET)
    async generateAddressBySecret(request: TransactionMaker.Common.GenerateAddressBySecretParams) {
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(request.secret);
        const address = await accountBaseHelper.getAddressFromPublicKey(keypair.publicKey);
        return address;
    }

    /**
     * 生成 blob 信息
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_BLOB_SEED)
    async generageBlobSeed(request: TransactionMaker.Common.GenerateBlobSeedParams) {
        return `${BLOB_IN_TRS_REMARK_PREFIX.SHA256}${request.hash}?size=${request.size}`;
    }

    /**
     * 生成密文签名
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_CIPHERTEXT_SIGNATURE)
    async generateCiphertextSignature(request: TransactionMaker.Common.GenerateCiphertextSignatureParams) {
        return getHexFromArrayBuffer(
            await this.bfchainCore.transactionHelper.getCiphertextSignature({
                secret: request.secret,
                transactionSignatureBuffer: parseHexToArrayBuffer(request.transactionSignature),
                senderId: request.senderId,
            })
        );
    }

    /**
     * 生成公私钥对
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_KEYPAIR)
    async generateKeypair(request: TransactionMaker.Common.GenerateKeypairParams) {
        const { secret, secondSecret } = request;
        const accountBaseHelper = this.bfchainCore.accountBaseHelper;
        const keypair = await accountBaseHelper.createSecretKeypair(secret);
        const keypairs: TransactionMaker.Common.Keypairs = {
            keypair: {
                secretKey: getHexFromArrayBuffer(keypair.secretKey),
                publicKey: getHexFromArrayBuffer(keypair.publicKey),
            },
        };
        if (secondSecret) {
            const secondKeypair = await accountBaseHelper.createSecondSecretKeypairV2(secret, secondSecret);
            keypairs.secondKeypair = {
                secretKey: getHexFromArrayBuffer(secondKeypair.secretKey),
                publicKey: getHexFromArrayBuffer(secondKeypair.publicKey),
            };
        }
        return keypairs;
    }

    /**
     * 生成跨链凭证信息
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.GENERATE_REGISTER_CHAIN_CERTIFICATE)
    async generateRegisterChainCertificate(request: TransactionMaker.Common.GenerateRegisterChainCertificateParams) {
        const { generatorSecret, generatorSecondSecret, genesisBlockInfo } = request;
        const certificate = await this.bfchainCore.registerChainCertificateHelper.generateRegisterChainCertificate({
            generatorSecret,
            generatorSecondSecret,
            genesisBlockInfo: {
                ...genesisBlockInfo,
                bnid: genesisBlockInfo.bnid as any,
            },
        });
        return certificate as unknown as TransactionMaker.RegisterChainCertificateJSON;
    }

    /**
     * 验证地址
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.VERIFY_ADDRESS)
    async verifyAddress(request: TransactionMaker.Common.VerifyAddressParams) {
        const isAddress = await this.bfchainCore.accountBaseHelper.isAddress(request.address);
        return isAddress;
    }

    /**
     * 验证公钥
     *
     * @param request
     * @returns
     */
    @Route(COMMON_API_PATH.VERIFY_PUBLICKEY)
    async verifyPublicKey(request: TransactionMaker.Common.VerifyPublicKeyParams) {
        const isPublicKey = this.bfchainCore.baseHelper.isValidPublicKey(request.publicKey);
        return isPublicKey;
    }

    private async __getPeerInfo(ip?: string) {
        const { chainNodeIps, broadcastTimeout } = this.config.config;
        const nodeIp = ip || chainNodeIps[Math.floor(Math.random() * chainNodeIps.length)];
        const bfchainCore = this.bfchainCore;
        const port = bfchainCore.config.ports.port;
        const url = this.chainCore.getUrl(nodeIp, port, bfchainCore);
        const aborter = new Aborter();
        setTimeout(() => {
            aborter.abort(`timeCorrecting timeout ${nodeIp}`);
        }, broadcastTimeout);
        const duplexHandler = await this.chainCore.getDuplexHandler(url, aborter, broadcastTimeout, bfchainCore);
        await sleep(1000);

        const peerInfo = await duplexHandler.forceDuplexca().requestPeerScan();
        if (!peerInfo) {
            throw new Error(`Failed to get peerInfo ${ip}`);
        }
        if (peerInfo.localInfo.extendsInfoPackage.chainChannel) {
            return {
                timestamp: peerInfo.localInfo.extendsInfoPackage.chainChannel.timestamp,
                maybeHeight: peerInfo.localInfo.extendsInfoPackage.chainChannel.height,
            };
        }
        return {
            timestamp: 0,
            maybeHeight: 1,
        };
    }

    @Route(COMMON_API_PATH.MAYBE_PEER_INFO)
    async getMaybePeerInfo(argv: TransactionMaker.Common.MaybePeerInfoParams) {
        const peerInfo = await this.__getPeerInfo(argv.ip);
        return peerInfo;
    }

    @Route(COMMON_API_PATH.TIME_CORRECTING)
    async timeCorrecting(argv: TransactionMaker.Common.TimeCorrectingParams) {
        const peerInfo = await this.__getPeerInfo(argv.ip);
        const bfchainCore = this.bfchainCore;
        const peerTime = bfchainCore.time.getTimeByTimestamp(peerInfo.timestamp);
        const curTime = bfchainCore.time.now();
        const diff = peerTime - curTime;
        bfchainCore.time.time_offset_ms += diff;
        return bfchainCore.time.now();
    }
}
