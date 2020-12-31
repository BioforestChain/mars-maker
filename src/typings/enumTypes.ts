//节点api接口
export enum CHAIN_API_PATH {
    /**获取指定账户 */
    GET_ACCOUNT_INFO_AND_ASSETS = "post/api/basic/getAccountInfoAndAssets",
    /**创建账户 */
    CREATE_ACCOUNT = "post/api/basic/createAccount",
    /**查询区块 */
    GET_BLOCK = "post/api/basic/getBlock",
    /**查询交易 */
    GET_TRANSACTIONS = "post/api/basic/getTransactions",
    /**存证交易 */
    TR_MARK = "post/api/transaction/trMark",
}

//节点事件类型
export enum CHAIN_TR_TYPE {
    /**注册为受托人 */
    TR_DELEGATE = "BFT-BFCHAIN-BSE-02",
    /**存证 */
    TR_MARK = "BFT-BFCHAIN-EXT-00",
}
