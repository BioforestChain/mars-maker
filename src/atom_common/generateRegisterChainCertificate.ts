import { Injectable } from "@bfchain/util";
import { COMMON_API_PATH } from "@bfmeta/transaction-maker-core";
import { CommonFactory } from "./_commonFactory";

@Injectable()
export class GenerateRegisterChainCertificateFactory extends CommonFactory<TransactionMaker.RegisterChainCertificateJSON> {
    readonly EXEC_API_PATH = COMMON_API_PATH.GENERATE_REGISTER_CHAIN_CERTIFICATE_API_PATH;

    async exec(request: TransactionMaker.Common.GenerateRegisterChainCertificateParams) {
        const { generatorSecret, generatorSecondSecret, genesisBlockInfo } = request;
        const certificate = await this.bfchainCore.registerChainCertificateHelper.generateRegisterChainCertificate({
            generatorSecret,
            generatorSecondSecret,
            genesisBlockInfo: {
                ...genesisBlockInfo,
                bnid: genesisBlockInfo.bnid as any,
            },
        });
        return certificate as unknown as TransactionMaker.RegisterChainCertificateJSON;
    }
}
