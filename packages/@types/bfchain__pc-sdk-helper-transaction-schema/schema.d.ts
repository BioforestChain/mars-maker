import { BASIC_API_PATH, SERVICE_API_PATH, SYSTEM_API_PATH, GENERATE_TRANSACTION_API_PATH } from "@bfchain/pc-sdk-api-constants";
export declare const BASIC_SCHEMA_MAP: Map<BASIC_API_PATH, BFMetaPcSdk.SchemaType | BFMetaPcSdk.SchemaType[]>;
export declare const SYSTEM_SCHEMA_MAP: Map<SERVICE_API_PATH, BFMetaPcSdk.SchemaType | BFMetaPcSdk.SchemaType[]>;
export declare const SERVICE_SCHEMA_MAP: Map<SYSTEM_API_PATH, BFMetaPcSdk.SchemaType | BFMetaPcSdk.SchemaType[]>;
export declare const TRANSACTION_SCHEMA_MAP: Map<GENERATE_TRANSACTION_API_PATH, BFMetaPcSdk.SchemaType | BFMetaPcSdk.SchemaType[]>;
