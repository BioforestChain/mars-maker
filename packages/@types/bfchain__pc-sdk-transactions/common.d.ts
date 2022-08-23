import type { BFChainCore } from "@bfchain/core";
import { EasyWeakMap } from "@bfchain/util";
export declare const COMMON_FACTORY_MAP_WM: EasyWeakMap<BFChainCore, Map<import("@bfchain/pc-sdk-api-constants").COMMON_API_PATH, import("./atom_common/_commonFactory").CommonFactory<any>>, BFChainCore>;
export declare function CommonFactory(bfchainCore: BFChainCore): void;
