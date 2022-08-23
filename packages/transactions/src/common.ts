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
    CalcTransactionMinFee,
    GenerateCiphertextSignatureFactory,
} from "./atom_common";
import { EasyWeakMap } from "@bfchain/util";
export const COMMON_FACTORY_MAP_WM = EasyWeakMap.from<BFChainCore, Map<BFChainPcSdk.Common.COMMON_API_PATH, BFChainPcSdk.Common.CommonFactory>>({
    creater() {
        return new Map();
    },
});

export function CommonFactory(bfchainCore: BFChainCore) {
    const COMMON_FACTORY_MAP = COMMON_FACTORY_MAP_WM.forceGet(bfchainCore);

    const verifyAddressFactory = new VerifyAddressFactory(bfchainCore);
    const verifyPublicKeyFactory = new VerifyPublicKeyFactory(bfchainCore);
    const generateKeypairFactory = new GenerateKeypairFactory(bfchainCore);
    const generateAccountFactory = new GenerateAccountFactory(bfchainCore);
    const generateAddressBySecretFactory = new GenerateAddressBySecretFactory(bfchainCore);
    const generateAddressByPublicKeyFactory = new GenerateAddressByPublicKeyFactory(bfchainCore);
    const asymmetricEncryptFactory = new AsymmetricEncryptFactory(bfchainCore);
    const asymmetricDecryptFactory = new AsymmetricDecryptFactory(bfchainCore);
    const calcTransactionMinFee = new CalcTransactionMinFee(bfchainCore);
    const generateCiphertextSignatureFactory = new GenerateCiphertextSignatureFactory(bfchainCore);

    COMMON_FACTORY_MAP.set(verifyAddressFactory.EXEC_API_PATH, verifyAddressFactory);
    COMMON_FACTORY_MAP.set(verifyPublicKeyFactory.EXEC_API_PATH, verifyPublicKeyFactory);
    COMMON_FACTORY_MAP.set(generateKeypairFactory.EXEC_API_PATH, generateKeypairFactory);
    COMMON_FACTORY_MAP.set(generateAccountFactory.EXEC_API_PATH, generateAccountFactory);
    COMMON_FACTORY_MAP.set(generateAddressBySecretFactory.EXEC_API_PATH, generateAddressBySecretFactory);
    COMMON_FACTORY_MAP.set(generateAddressByPublicKeyFactory.EXEC_API_PATH, generateAddressByPublicKeyFactory);
    COMMON_FACTORY_MAP.set(asymmetricEncryptFactory.EXEC_API_PATH, asymmetricEncryptFactory);
    COMMON_FACTORY_MAP.set(asymmetricDecryptFactory.EXEC_API_PATH, asymmetricDecryptFactory);
    COMMON_FACTORY_MAP.set(calcTransactionMinFee.EXEC_API_PATH, calcTransactionMinFee);
    COMMON_FACTORY_MAP.set(generateCiphertextSignatureFactory.EXEC_API_PATH, generateCiphertextSignatureFactory);

    Object.freeze(COMMON_FACTORY_MAP);
}
