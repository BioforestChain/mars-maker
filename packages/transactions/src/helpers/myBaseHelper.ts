import * as fs from "fs";
import * as path from "path";
import { BFChainSecret } from "@bfchain/coretools-secret";
import { MyGenesisBlockHelper } from "./myGenesisBlockHelper";
import { TransactionConfigHelper } from "@bfchain/pc-sdk-helper-transaction-config";
import { BFChainCoreFactory, ConfigHelper, BFChainCore } from "@bfchain/core";
import { NodeJsCryptoHelper, NodeJsKeypairHelper, Ed2curveHelper } from "@bfchain/coretools-generate-genesis-block";

export class MyBaseHelper {
    private __bfchainSecret: BFChainSecret;
    private __myGenesisBlockHelper: MyGenesisBlockHelper;
    private __myConfigHelper: TransactionConfigHelper;

    constructor(configOptions?: BFChainPcSdk.TransactionConfigOptions) {
        this.__myConfigHelper = new TransactionConfigHelper(configOptions);

        this.__bfchainSecret = new BFChainSecret(NodeJsCryptoHelper);

        const genesisInfoConfig = this.genesisInfoConfig;
        this.__myGenesisBlockHelper = new MyGenesisBlockHelper(genesisInfoConfig.blockPerRound, genesisInfoConfig.forgeInterval);
    }

    get genesisInfoConfig() {
        return this.__myConfigHelper.transactionConfig.genesisInfoConfig;
    }

    setGenesisInfoConfig(genesisInfoConfigOptions: BFChainPcSdk.GenesisInfoConfigOptions) {
        this.__myConfigHelper.setGenesisInfoConfig(genesisInfoConfigOptions);
    }

    get config() {
        return this.__myConfigHelper.transactionConfig;
    }

    setTransactionConfig(transactionConfigOptions: BFChainPcSdk.TransactionConfigOptions) {
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
}
