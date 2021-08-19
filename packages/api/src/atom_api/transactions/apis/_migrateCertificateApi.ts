export abstract class MigrateCertificateApi {
    abstract readonly GENERATE_API_PATH: BFChainPcSdk.CrossChain.MIGRATE_CERTIFICATE_API_PATH;

    constructor(protected networkHelper: BFChainPcSdk.NetworkHelper) {}
}
