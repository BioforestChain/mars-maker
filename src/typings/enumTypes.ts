/**节点事件类型 */
export enum CHAIN_TR_TYPE {
    /**注册为受托人 */
    TR_DELEGATE = "BFT-BFCHAIN-BSE-01",
    /**存证 */
    TR_MARK = "BFT-BFCHAIN-EXT-00",
}

/**ws事件推送类型 */
export enum WsEventType {
    /**收到新区块 */
    onNewBlock = "onNewBlock",
    /**删除区块 */
    onDeleteBlock = "onDeleteBlock",
}
