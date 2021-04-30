const ec = {
    start: 0,
    errorCode: [] as [string, string][],
    set next(v: string) {
        ec.errorCode.push([v, String(ec.start++)]);
    },
};

ec.start = 1000;
// #region
export const UNKNOWN_REQUEST_TYPE = (ec.next = "unknown request type");
export const REQUEST_PARAMETER_PARSE_FAILED = (ec.next = "request parameter parse failed");
export const REQUEST_URL_IS_REQUIRED = (ec.next = "request url is required");
export const REQUEST_METHOD_IS_REQUIRED = (ec.next = "request method is required");
export const REQUEST_PARAMETER_ONLY_CAN_BE_JSON = (ec.next = "request parameter only can be json");
export const REQUEST_ERROR = (ec.next = "request {apiPath} error");
// #endregion

ec.start = 2000;
// #region
export const API_ENDPOINT_NOT_FOUND = (ec.next = "api endpoint not found");
// #endregion

// #region
/**module target function */
export const MODULE_DUPLICATE = (ec.next = "{module} in {target} is already exists when {function}");
/**module target function */
export const MODULE_NOT_EXISTS = (ec.next = "{module} in {target} is not exists when {function}");
// #endregion

// #region
ec.start = 10000;
/**prop target function */
export const PROP_IS_REQUIRE = (ec.next = "{prop} in {target} is required when {function}");
/**prop target function */
export const PROP_IS_INVALID = (ec.next = "{prop} in {target} is invalid when {function}");
// #endregion

export const errorCode = new Map(
    ec.errorCode.concat([
        /**最通用的外层错误 */
        ["unknown error", "7001"],
    ])
);
