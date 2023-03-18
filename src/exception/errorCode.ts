import { ErrorCode } from "@bfchain/util-exception-error-code";

export const ERROR_LIST = {
    /**最通用的外层错误 */
    UNKNOWN_ERROR: new ErrorCode("7001", "unknown error"),

    // #region
    UNKNOWN_REQUEST_TYPE: new ErrorCode("000001", "unknown request type {requestType}"),
    REQUEST_PARAMETER_PARSE_FAILED: new ErrorCode("000002", "request parameter parse failed"),
    REQUEST_URL_IS_REQUIRED: new ErrorCode("000003", "request url is required"),
    REQUEST_METHOD_IS_REQUIRED: new ErrorCode("000004", "request method is required"),
    REQUEST_PARAMETER_ONLY_CAN_BE_JSON: new ErrorCode("000005", "request parameter only can be json"),
    REQUEST_ERROR: new ErrorCode("000006", "request {apiPath} error"),
    NOT_MATCH: new ErrorCode("000007", "{to_compare_prop} in {to_target} and {be_compare_prop} in {be_target} not match"),
    // #endregion

    // #region
    API_ENDPOINT_NOT_FOUND: new ErrorCode("001001", "api endpoint not found {apiPath}"),
    // #endregion

    // #region
    /**module target function */
    MODULE_DUPLICATE: new ErrorCode("002001", "{module} in {target} is already exists"),
    /**module target function */
    MODULE_NOT_EXISTS: new ErrorCode("002002", "{module} in {target} is not exists"),
    // #endregion

    // #region
    /**prop target function */
    PROP_IS_REQUIRE: new ErrorCode("003001", "{prop} in {target} is required"),
    /**prop target function */
    PROP_IS_INVALID: new ErrorCode("003002", "{prop} in {target} is invalid"),
    // #endregion

    // #region blob
    DOWNLOAD_BLOB_FAIL: new ErrorCode("004001", "download blob fail hash {hash}"),
    BLOB_NOT_EXIST: new ErrorCode("004002", "blob not exist hash {hash}"),
    BLOB_ALREADY_EXIST: new ErrorCode("004003", "blob already exist hash {hash}"),
    BLOB_NOT_OPEN: new ErrorCode("004004", "blob not open pointer {pointer}"),
    BLOB_CHUNK_STORAGE_LOSS_WITH_POINTER: new ErrorCode("004005", "blob chunk storage loss, should not happen pointer {pointer}"),
    BLOB_CHUNK_STORAGE_LOSS_WITH_HASH: new ErrorCode("0040026", "blob chunk storage loss, should not happen hash {hash}"),
    BLOB_CHUNK_LOSS: new ErrorCode("004007", "blob chunk loss, should not happen hash {hash}"),
    // #endregion
};
