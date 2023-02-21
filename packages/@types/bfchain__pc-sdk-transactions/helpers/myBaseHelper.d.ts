import { BFChainSecret } from "@bfchain/coretools-secret";
import { MyGenesisBlockHelper } from "./myGenesisBlockHelper";
import { BLOCK_CHAIN_NET_WORK_TYPE } from "@bfchain/pc-sdk-helper-transaction-config";
import { ConfigHelper, BFChainCore } from "@bfchain/core";
export declare class MyBaseHelper {
    private __bfchainSecret;
    private __myGenesisBlockHelper;
    private __myConfigHelper;
    private __genesisBlock?;
    constructor(configOptions?: BFMetaPcSdk.TransactionConfigOptions, genesisBlock?: BFChainCore.GenesisBlockJSON);
    get genesisInfoConfig(): BFMetaPcSdk.GenesisInfoConfig;
    setGenesisInfoConfig(genesisInfoConfigOptions: BFMetaPcSdk.GenesisInfoConfigOptions): void;
    get config(): BFMetaPcSdk.TransactionConfig;
    setTransactionConfig(transactionConfigOptions: BFMetaPcSdk.TransactionConfigOptions): void;
    get bfchainSecret(): BFChainSecret;
    get genesisBlockHelper(): MyGenesisBlockHelper;
    getGenesisBlock(): BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>;
    get bfchainCore(): BFChainCore;
    getConfigHelper(genesisBlock?: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>, networkType?: BLOCK_CHAIN_NET_WORK_TYPE): ConfigHelper;
    cacheMap: Map<string, BFChainCore>;
    getBfchainCore(genesisBlock?: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>): BFChainCore;
    getBfchainHelper(): {
        configHelper: ConfigHelper;
        accountBaseHelper: import("@bfchain/core").AccountBaseHelper;
        transactionHelper: import("@bfchain/core").TransactionHelper;
    };
    generateSecret(): Promise<string>;
    isValidSecret(secret: string): Promise<boolean>;
    getAccountAddressBySecret(secret: string, bfchainCore?: BFChainCore): Promise<string>;
    getAccountAddressFromPublicKey(publicKey: string, bfchainCore?: BFChainCore): Promise<string>;
    getAccountPublicKeyFromSecret(secret: string, bfchainCore?: BFChainCore): Promise<string>;
    getAccountKeypair(secret: string, bfchainCore?: BFChainCore): Promise<BFChainCore.Keypair>;
    getAccountSecondKeypair(secret: string, secondSecret: string, bfchainCore?: BFChainCore): Promise<BFChainCore.Keypair>;
}
