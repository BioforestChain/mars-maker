import type { BFChainCore } from "@bfchain/core";
import { VerifyAddressFactory } from "./atom_common";

export const COMMON_FACTORY_MAP = new Map<BFChainPcSdk.Common.COMMON_API_PATH, BFChainPcSdk.Common.CommonFactory>();

export function CommonFactory(bfchainCore: BFChainCore) {
    const verifyAddressFactory = new VerifyAddressFactory(bfchainCore);

    COMMON_FACTORY_MAP.set(verifyAddressFactory.EXEC_API_PATH, verifyAddressFactory);

    Object.freeze(COMMON_FACTORY_MAP);
}
