import { BFChainSecret } from "@bfchain/coretools-secret";
import { MyGenesisBlockHelper } from "./myGenesisBlockHelper";
import { ConfigHelper, BFChainCore } from "@bfchain/core";
export declare class MyBaseHelper {
    private __bfchainSecret;
    private __myGenesisBlockHelper;
    private __myConfigHelper;
    constructor(configOptions?: BFChainPcSdk.TransactionConfigOptions);
    get genesisInfoConfig(): BFChainPcSdk.GenesisInfoConfig;
    setGenesisInfoConfig(genesisInfoConfigOptions: BFChainPcSdk.GenesisInfoConfigOptions): void;
    get config(): BFChainPcSdk.TransactionConfig;
    setTransactionConfig(transactionConfigOptions: BFChainPcSdk.TransactionConfigOptions): void;
    get bfchainSecret(): BFChainSecret;
    get genesisBlockHelper(): MyGenesisBlockHelper;
    getGenesisBlock(): BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>;
    get bfchainCore(): BFChainCore;
    getConfigHelper(
        genesisBlock?: BFChainCore.BlockJSON<BFChainCore.GenesisBlockAssetJSON>,
        networkType?: import("@bfchain/pc-sdk-helper-transaction-config").BLOCK_CHAIN_NET_WORK_TYPE
    ): ConfigHelper;
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
