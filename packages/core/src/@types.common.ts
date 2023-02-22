declare namespace TransactionMaker {
    namespace Common {
        type COMMON_API_PATH = import("./constants").COMMON_API_PATH;

        interface CommonParams {}

        interface VerifyAddressParams extends CommonParams {
            /**账户地址 */
            address: string;
        }

        interface VerifyPublicKeyParams extends CommonParams {
            /**账户公钥 */
            publicKey: string;
        }

        interface GenerateAccountParams extends CommonParams {
            /**密钥 */
            secret: string;
            /**安全密钥 */
            secondSecret?: string;
        }

        interface GenerateAddressBySecretParams extends CommonParams {
            /**密钥 */
            secret: string;
        }

        interface GenerateAddressByPublicKeyParams extends CommonParams {
            /**账户公钥 */
            publicKey: string;
        }

        interface AccountInfo {
            /**账户地址 */
            address: string;
            /**账户公钥 */
            publicKey: string;
            /**账户安全公钥 */
            secondPublicKey?: string;
        }

        interface AsymmetricEncryptParams extends CommonParams {
            /**要加密的信息 */
            msg: string;
            /**用于加密的公钥 */
            decryptPK: string;
            /**用于加密的私钥 */
            encryptSK: string;
        }

        interface AsymmetricDecryptParams extends CommonParams {
            /**要解密的信息 */
            encryptedMessage: string;
            /**用于解密的公钥 */
            encryptPK: string;
            /**用于解密的私钥 */
            decryptSK: string;
            nonce?: string;
        }

        interface AsymmetricEncrypt {
            nonce: string;
            encryptedMessage: string;
        }

        type AsymmetricDecrypt = false | string;

        interface GenerateKeypairParams extends CommonParams {
            /**密钥 */
            secret: string;
            /**安全密钥 */
            secondSecret?: string;
        }

        interface Keypairs {
            keypair: {
                publicKey: string;
                secretKey: string;
            };
            secondKeypair?: {
                publicKey: string;
                secretKey: string;
            };
        }

        interface FractionJSON<T extends number | bigint | string = number> {
            /**分子 */
            numerator: T;
            /**分母 */
            denominator: T;
        }

        interface CalcTransactionMinFeeParams extends CommonParams {
            /**完整的事件 */
            transaction: TransactionJSON;
            /**自定义的最低手续费 */
            customMinFeePerByte?: FractionJSON;
        }

        interface TransactionMinFee {
            minFee: string;
        }

        interface GenerateCiphertextSignatureParams extends CommonParams {
            /**加密密钥 */
            secret: string;
            /**关联交易的签名 */
            transactionSignature: string;
            /**交易的发起账户地址 */
            senderId: string;
        }

        interface GenerateBlobSeedParams extends CommonParams {
            /**加密密钥 */
            hash: string;
            /**关联交易的签名 */
            size: number;
        }

        interface TimeCorrectingParams extends CommonParams {
            /**目标节点 ip */
            ip?: string;
        }
    }
}
