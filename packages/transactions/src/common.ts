import type { BFChainCore } from "@bfchain/core";
import {
    VerifyAddressFactory,
    VerifyPublicKeyFactory,
    GenerateKeypairFactory,
    GenerateAccountFactory,
    GenerateAddressBySecretFactory,
    GenerateAddressByPublicKeyFactory,
    AsymmetricEncryptFactory,
    AsymmetricDecryptFactory,
} from "./atom_common";

export const COMMON_FACTORY_MAP = new Map<BFChainPcSdk.Common.COMMON_API_PATH, BFChainPcSdk.Common.CommonFactory>();

export function CommonFactory(bfchainCore: BFChainCore) {
    const verifyAddressFactory = new VerifyAddressFactory(bfchainCore);
    const verifyPublicKeyFactory = new VerifyPublicKeyFactory(bfchainCore);
    const generateKeypairFactory = new GenerateKeypairFactory(bfchainCore);
    const generateAccountFactory = new GenerateAccountFactory(bfchainCore);
    const generateAddressBySecretFactory = new GenerateAddressBySecretFactory(bfchainCore);
    const generateAddressByPublicKeyFactory = new GenerateAddressByPublicKeyFactory(bfchainCore);
    const asymmetricEncryptFactory = new AsymmetricEncryptFactory(bfchainCore);
    const asymmetricDecryptFactory = new AsymmetricDecryptFactory(bfchainCore);

    COMMON_FACTORY_MAP.set(verifyAddressFactory.EXEC_API_PATH, verifyAddressFactory);
    COMMON_FACTORY_MAP.set(verifyPublicKeyFactory.EXEC_API_PATH, verifyPublicKeyFactory);
    COMMON_FACTORY_MAP.set(generateKeypairFactory.EXEC_API_PATH, generateKeypairFactory);
    COMMON_FACTORY_MAP.set(generateAccountFactory.EXEC_API_PATH, generateAccountFactory);
    COMMON_FACTORY_MAP.set(generateAddressBySecretFactory.EXEC_API_PATH, generateAddressBySecretFactory);
    COMMON_FACTORY_MAP.set(generateAddressByPublicKeyFactory.EXEC_API_PATH, generateAddressByPublicKeyFactory);
    COMMON_FACTORY_MAP.set(asymmetricEncryptFactory.EXEC_API_PATH, asymmetricEncryptFactory);
    COMMON_FACTORY_MAP.set(asymmetricDecryptFactory.EXEC_API_PATH, asymmetricDecryptFactory);

    Object.freeze(COMMON_FACTORY_MAP);
}
