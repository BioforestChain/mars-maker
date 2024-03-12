import { Injectable, Inject } from "@bfchain/util";
import { PARENT_ASSET_TYPE, BFChainCore } from "@bfchain/core";
import { INJECT_MODULE } from "../constants";
import { Route } from "../decorators";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfmeta/transaction-maker-typings";

@Injectable()
export class MigrateCertificateService {
    @Inject(INJECT_MODULE.CORE)
    public bfchainCore!: BFChainCore;

    @Route(MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE)
    async generateMigrateCertificate(request: TransactionMaker.CrossChain.GenerateMigrateCertificateParams) {
        const assetInfo = request.assetInfo;
        let parentAssetType = PARENT_ASSET_TYPE.ASSETS;
        let assetType = this.bfchainCore.config.assetType;
        const baseHelper = this.bfchainCore.baseHelper;
        if (assetInfo) {
            const inputAssetType = assetInfo.assetType;
            if (inputAssetType) {
                if (assetInfo.parentAssetType) {
                    parentAssetType = assetInfo.parentAssetType as number;
                } else {
                    if (baseHelper.isValidAssetType(inputAssetType)) {
                        parentAssetType = PARENT_ASSET_TYPE.ASSETS;
                    } else if (baseHelper.isValidDAppId(inputAssetType)) {
                        parentAssetType = PARENT_ASSET_TYPE.DAPP;
                    } else if (baseHelper.isValidLocationName(inputAssetType)) {
                        parentAssetType = PARENT_ASSET_TYPE.LOCATION_NAME;
                    } else if (baseHelper.isValidEntityId(inputAssetType)) {
                        parentAssetType = PARENT_ASSET_TYPE.ENTITY;
                    } else {
                        throw new Error(`Unkonwn assetType ${inputAssetType}`);
                    }
                }
            }
        }
        const migrateCertificate = await this.bfchainCore.migrateCertificateHelper.generateMigrateCertificate({
            ...request,
            assetInfo: {
                parentAssetType,
                assetType,
            },
        });
        return migrateCertificate;
    }

    @Route(MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_FROM_AUTH_SIGNATURE)
    async fromAuthSignMigrateCertificate(request: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificateHelper = bfchainCore.migrateCertificateHelper;
        let migrateCertificate = request.migrateCertificate;
        await migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckFromChainInfo: true,
            fromChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisGenerators: bfchainCore.transactionHelper.genesisGenerators(config),
            },
        });
        migrateCertificate = await bfchainCore.migrateCertificateHelper.fromAuthSignMigrateCertificate(request);
        return migrateCertificate;
    }

    @Route(MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_TO_AUTH_SIGNATURE)
    async toAuthSignMigrateCertificate(request: BFChainCore.CrossChain.AuthSignMigrateCertificateArgs) {
        const bfchainCore = this.bfchainCore;
        const config = bfchainCore.config;
        const { chainName, magic, generatorPublicKey, signature } = config;
        const migrateCertificateHelper = bfchainCore.migrateCertificateHelper;
        let migrateCertificate = request.migrateCertificate;
        await migrateCertificateHelper.verifyMigrateCertificate(migrateCertificate, {
            forceCheckToChainInfo: true,
            toChainBaseConfig: {
                chainName,
                magic,
                generatorPublicKey,
                genesisBlockSignature: signature,
                genesisGenerators: bfchainCore.transactionHelper.genesisGenerators(config),
            },
            forceCheckFromAuthSignature: true,
        });
        migrateCertificate = await bfchainCore.migrateCertificateHelper.toAuthSignMigrateCertificate(request);
        return migrateCertificate;
    }
}
