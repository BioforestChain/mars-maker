import type { Logger } from "./logger";
import type { Config } from "./config";
import type { Aborter } from "@bfchain/util-aborter";
import * as fs from "node:fs";
import * as path from "node:path";
import { sleep } from "@bfchain/util";
import { BFChainCoreFactory, ConfigHelper, BFChainCore, BNID_TYPE, NETWORK_TYPE } from "@bfchain/core";
import { BFChainSecret, NodeJsCryptoHelper, NodeJsKeypairHelper, Ed2curveHelper } from "@bfchain/coretools";
import { PeerHelper, ChannelClient } from "@bfchain/duplexnodejshelper";
import { Sha256BlobReader, Sha256BlobWriter } from "./blobHelper";
import { OsLocaleHelper } from "./osLocaleHelper";
import { ERROR_LIST, translatedErrorCodeListMap } from "./exception";

export class ChainCore {
    private __config: Config;
    private __logger: Logger;
    private __bfchainSecret: BFChainSecret;
    private __osLocaleHelper: OsLocaleHelper;
    private __genesisBlock?: BFChainCore.GenesisBlockJSON;

    constructor(logger: Logger, config: Config, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        this.__logger = logger;
        this.__config = config;
        if (genesisBlock) {
            this.__genesisBlock = genesisBlock;
        }

        this.__osLocaleHelper = new OsLocaleHelper();
        this.__bfchainSecret = new BFChainSecret(NodeJsCryptoHelper);
    }

    get SYSTEM_LANGUAGE() {
        return this.__osLocaleHelper.getLocale();
    }

    get genesisInfoConfig() {
        return this.__config.config.genesisInfoConfig;
    }

    setGenesisInfoConfig(genesisInfoConfigOptions: TransactionMaker.Server.GenesisInfoConfigOptions) {
        this.__config.setGenesisInfoConfig(genesisInfoConfigOptions);
    }

    get config() {
        return this.__config.config;
    }

    setConfig(transactionConfigOptions: TransactionMaker.Server.ConfigOptions) {
        this.__config.setConfig(transactionConfigOptions);
    }

    /**
     * 获取创世块
     *
     */
    getGenesisBlock() {
        if (this.__genesisBlock) {
            return this.__genesisBlock;
        }
        const { genesisBlockPath, genesisBlockLicensePath } = this.genesisInfoConfig;
        const filePath = path.join(process.cwd(), genesisBlockPath);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Genesis block not exist ${filePath}`);
        }
        const genesisBlockJson: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        return genesisBlockJson;
    }

    get bfchainCore() {
        return this.getBfchainCore();
    }

    /**
     * 获取 configHelper
     *
     * @param genesisBlock
     * @param networkType
     */
    getConfigHelper(genesisBlock = this.getGenesisBlock()) {
        if (!genesisBlock) {
            throw new Error(`Failed to get genesis block`);
        }
        const networkType = genesisBlock.asset.genesisAsset.bnid === BNID_TYPE.MAINNET ? NETWORK_TYPE.MAINNET : NETWORK_TYPE.TESTNET;
        return new ConfigHelper(genesisBlock, networkType);
    }

    cacheMap = new Map<string, BFChainCore>();
    /**
     * 获取 core 包对象
     *
     */
    getBfchainCore(genesisBlock = this.getGenesisBlock()) {
        const signature = genesisBlock.signature;
        const core = this.cacheMap.get(signature);
        if (core) {
            return core;
        } else {
            const _core = BFChainCoreFactory({
                config: this.getConfigHelper(genesisBlock),
                Buffer: Buffer as any,
                cryptoHelper: NodeJsCryptoHelper,
                keypairHelper: NodeJsKeypairHelper,
                ed2curveHelper: Ed2curveHelper,
                blobSha256Reader: new Sha256BlobReader(this.__logger),
                blobSha256Writer: new Sha256BlobWriter(this.__logger),
            });
            _core.i18N.setLanguage(this.SYSTEM_LANGUAGE);
            _core.i18N.addErrorCodeList("TransactionMaker", ERROR_LIST, translatedErrorCodeListMap);
            this.cacheMap.set(signature, _core);
            return _core;
        }
    }

    getBfchainHelper() {
        return {
            configHelper: this.bfchainCore.config,
            accountBaseHelper: this.bfchainCore.accountBaseHelper,
            transactionHelper: this.bfchainCore.transactionHelper,
        };
    }

    /**
     * 获取新的主密码
     *
     */
    generateSecret() {
        return this.__bfchainSecret.generatePassphrase(this.config.lang as any);
    }

    /**
     * 校验主密码是否合法
     *
     * @param secret
     */
    isValidSecret(secret: string) {
        return this.__bfchainSecret.isValidSecret(secret);
    }

    /**
     * 根据密码获取账户地址
     *
     * @param secret
     * @param bfchainCore
     */
    getAccountAddressBySecret(secret: string, bfchainCore = this.bfchainCore) {
        return bfchainCore.accountBaseHelper.getAddressFromSecret(secret);
    }

    /**
     * 根据公钥字符串获取账户地址
     *
     * @param publicKey
     * @param bfchainCore
     */
    getAccountAddressFromPublicKey(publicKey: string, bfchainCore = this.bfchainCore) {
        return bfchainCore.accountBaseHelper.getAddressFromPublicKeyString(publicKey);
    }

    /**
     * 根据主密码获取账户公钥
     *
     * @param secret
     * @param bfchainCore
     */
    getAccountPublicKeyFromSecret(secret: string, bfchainCore = this.bfchainCore) {
        return bfchainCore.accountBaseHelper.getPublicKeyStringFromSecret(secret);
    }

    /**
     * 根据主密码获取账户公私钥对
     *
     * @param secret
     * @param bfchainCore
     */
    getAccountKeypair(secret: string, bfchainCore = this.bfchainCore) {
        return bfchainCore.accountBaseHelper.createSecretKeypair(secret);
    }

    /**
     * 根据主密码和二次密码获取账户二次密码的公私钥对
     *
     * @param secret
     * @param secondSecret
     * @param bfchainCore
     */
    getAccountSecondKeypair(secret: string, secondSecret: string, bfchainCore = this.bfchainCore) {
        return bfchainCore.accountBaseHelper.createSecondSecretKeypair(secret, secondSecret);
    }

    getUrl(ip: string, port?: number, bfchainCore = this.bfchainCore) {
        return `bnqkl:${ip}:${port || bfchainCore.config.ports.port}`;
    }

    private __duplexHandlerMap = new Map<string, ChannelClient>();

    private _duplexAddress!: string;
    private _duplexPort!: number;

    async getDuplexAddress(bfchainCore: BFChainCore) {
        if (!this._duplexAddress) {
            const address = await bfchainCore.accountBaseHelper.getAddressFromSecret(
                `${Math.random().toString(32).slice(2)} ${Math.random().toString(32).slice(2)}`
            );
            this._duplexAddress = address;
        }
        return this._duplexAddress;
    }

    setDuplexAddress(duplexAddress: string) {
        this._duplexAddress = duplexAddress;
    }

    getDuplexPort() {
        if (this._duplexPort === undefined) {
            this._duplexPort = 8888;
        }
        return this._duplexPort;
    }

    setDuplexPort(duplexPort: number) {
        this._duplexPort = duplexPort;
    }

    async getDuplexHandler(url: string, aborter: Aborter, timeout = 30000, bfchainCore = this.bfchainCore) {
        let duplexHandler = this.__duplexHandlerMap.get(url);
        if (!duplexHandler) {
            const peerHelper = new PeerHelper(bfchainCore);
            const duplexAddress = await aborter.wrapAsync(this.getDuplexAddress(bfchainCore));
            const peerSearcher = peerHelper.install(duplexAddress, this.getDuplexPort());
            duplexHandler = await aborter.wrapAsync(peerSearcher.outbing(url, timeout));
            this.__duplexHandlerMap.set(url, duplexHandler);
            duplexHandler.onClose(() => {
                this.deleteDuplexHandler(url);
            });
            await sleep(1000);
        }
        return duplexHandler;
    }

    deleteDuplexHandler(url: string) {
        this.__duplexHandlerMap.delete(url);
    }

    async getChainChannelHeightAndTime(channelClient: ChannelClient, aborter: Aborter, bfchainCore = this.bfchainCore) {
        const peerInfo = await aborter.wrapAsync(channelClient.forceDuplexca().requestPeerScan());
        if (!peerInfo) {
            throw new Error("Failed to get peerInfo");
        }
        const chainChannel = peerInfo.localInfo.extendsInfoPackage.chainChannel;
        return {
            height: chainChannel ? chainChannel.height : 0,
            timestamp: chainChannel ? chainChannel.timestamp : bfchainCore.time.getTimestamp(),
        };
    }

    timeCorrecting(bfchainCore = this.bfchainCore, peerTimestamp: number) {
        const peerTime = bfchainCore.time.getTimeByTimestamp(peerTimestamp);
        const curTime = bfchainCore.time.now();
        const diff = peerTime - curTime;
        bfchainCore.time.time_offset_ms += diff;
    }
}
