import { Resolve } from "@bfchain/util";
const { BFChainPC_SDK } = require("../cjs");

export class SDKTest {
    constructor() {}

    async process() {
        const sdk: any = Resolve(BFChainPC_SDK);
        sdk.init("WS", { ip: "192.168.110.51", port: 19003, timeout: 10000 });
        const lastBlock = await sdk.getLastBlock();
        console.log(`lastBlock:${JSON.stringify(lastBlock, null, 4)}`);
        const block = await sdk.getBlock({ height: 1 });
        console.log(`block:${JSON.stringify(block, null, 4)}`);
    }
}

(async () => {
    const test = new SDKTest();
    await test.process();
    process.exit(0);
})();
