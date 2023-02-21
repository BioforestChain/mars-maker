import { Injectable } from "@bfchain/util";
import { PARENT_ASSET_TYPE } from "@bfchain/core";
import { MIGRATE_CERTIFICATE_API_PATH } from "@bfchain/pc-sdk-api-constants";
import { MigrateCertificateFactory } from "./_migrateCertificateFactory";

@Injectable()
export class MigrateCertificateGenerateFactory extends MigrateCertificateFactory {
    readonly GENERATE_API_PATH = MIGRATE_CERTIFICATE_API_PATH.MIGRATE_CERTIFICATE_GENERATE;

    async generate(request: BFMetaPcSdk.CrossChain.GenerateMigrateCertificateParams) {
        const assetInfo = request.assetInfo;
        let parentAssetType = PARENT_ASSET_TYPE.ASSETS;
        let assetType = this.bfchainCore.config.assetType;
        const baseHelper = this.bfchainCore.baseHelper;
        if (assetInfo) {
            const inputAssetType = assetInfo.assetType;
            if (inputAssetType) {
                if (assetInfo.parentAssetType) {
                    parentAssetType = assetInfo.parentAssetType;
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
}
