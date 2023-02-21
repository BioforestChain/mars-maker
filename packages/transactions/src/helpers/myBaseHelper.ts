import type { Aborter } from "@bfchain/util-aborter";
import * as fs from "node:fs";
import * as path from "node:path";
import { BFChainCoreFactory, ConfigHelper, BFChainCore, BNID_TYPE } from "@bfchain/core";
import { BFChainSecret, NodeJsCryptoHelper, NodeJsKeypairHelper, Ed2curveHelper } from "@bfchain/coretools";
import { BLOCK_CHAIN_NET_WORK_TYPE, TransactionConfigHelper } from "@bfchain/pc-sdk-helper-transaction-config";
import { PeerHelper, ChannelClient } from "@bfchain/duplexnodejshelper";
import { MyGenesisBlockHelper } from "./myGenesisBlockHelper";

export class MyBaseHelper {
    private __bfchainSecret: BFChainSecret;
    private __myGenesisBlockHelper: MyGenesisBlockHelper;
    private __myConfigHelper: TransactionConfigHelper;
    private __genesisBlock?: BFChainCore.GenesisBlockJSON;

    constructor(configOptions: BFMetaPcSdk.TransactionConfigOptions = {}, genesisBlock?: BFChainCore.GenesisBlockJSON) {
        if (genesisBlock) {
            const genesisAsset = genesisBlock.asset.genesisAsset;
            configOptions.genesisInfoConfig = {
                isGenesisBlockProvidedExternally: false,
                networkType: genesisAsset.bnid === BNID_TYPE.MAINNET ? BLOCK_CHAIN_NET_WORK_TYPE.MAINNET : BLOCK_CHAIN_NET_WORK_TYPE.TESTNET,
                chainAssetType: genesisAsset.assetType,
                blockPerRound: genesisAsset.blockPerRound,
                forgeInterval: genesisAsset.forgeInterval,
            };
            this.__genesisBlock = genesisBlock;
        }

        this.__myConfigHelper = new TransactionConfigHelper(configOptions);

        this.__bfchainSecret = new BFChainSecret(NodeJsCryptoHelper);

        const genesisInfoConfig = this.genesisInfoConfig;
        this.__myGenesisBlockHelper = new MyGenesisBlockHelper(genesisInfoConfig.blockPerRound, genesisInfoConfig.forgeInterval);
    }

    get genesisInfoConfig() {
        return this.__myConfigHelper.transactionConfig.genesisInfoConfig;
    }

    setGenesisInfoConfig(genesisInfoConfigOptions: BFMetaPcSdk.GenesisInfoConfigOptions) {
        this.__myConfigHelper.setGenesisInfoConfig(genesisInfoConfigOptions);
    }

    get config() {
        return this.__myConfigHelper.transactionConfig;
    }

    setTransactionConfig(transactionConfigOptions: BFMetaPcSdk.TransactionConfigOptions) {
        this.__myConfigHelper.setTransactionConfig(transactionConfigOptions);
    }

    get bfchainSecret() {
        return this.__bfchainSecret;
    }

    get genesisBlockHelper() {
        return this.__myGenesisBlockHelper;
    }

    /**
     * 获取创世块
     *
     */
    getGenesisBlock() {
        if (this.__genesisBlock) {
            return this.__genesisBlock;
        }
        const { isGenesisBlockProvidedExternally, chainAssetType, networkType, blockPerRound, forgeInterval, genesisBlockRootPath } = this.genesisInfoConfig;
        if (isGenesisBlockProvidedExternally) {
            const rootPath = genesisBlockRootPath || path.join(process.cwd(), "genesisInfos");
            if (!fs.existsSync(rootPath)) {
                throw new Error(`Genesis block not exist ${rootPath}`);
            }
            const filePath = path.join(
                rootPath,
                `${chainAssetType.toLowerCase()}-genesisBlock-${networkType.toLowerCase()}-${blockPerRound}b-${forgeInterval}s.json`
            );
            if (!fs.existsSync(filePath)) {
                throw new Error(`Genesis block not exist ${filePath}`);
            }
            const genesisBlockJson: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON> = require(filePath);
            return genesisBlockJson;
        }
        return this.genesisBlockHelper.genesisBlockJson;
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
    getConfigHelper(genesisBlock = this.getGenesisBlock(), networkType = this.genesisInfoConfig.networkType) {
        if (!genesisBlock) {
            throw new Error(`Failed to get genesis block`);
        }
        return new ConfigHelper(genesisBlock, networkType);
    }

    cacheMap = new Map<string, BFChainCore>();
    /**
     * 获取 core 包对象
     *
     */
    getBfchainCore(genesisBlock = this.getGenesisBlock()) {
        const signature = genesisBlock && genesisBlock.signature;
        if (signature) {
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
                });
                this.cacheMap.set(signature, _core);
                return _core;
            }
        } else {
            return BFChainCoreFactory({
                config: this.getConfigHelper(genesisBlock),
                Buffer: Buffer as any,
                cryptoHelper: NodeJsCryptoHelper,
                keypairHelper: NodeJsKeypairHelper,
                ed2curveHelper: Ed2curveHelper,
            });
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
        return this.bfchainSecret.generatePassphrase(this.config.lang as any);
    }

    /**
     * 校验主密码是否合法
     *
     * @param secret
     */
    isValidSecret(secret: string) {
        return this.bfchainSecret.isValidSecret(secret);
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
