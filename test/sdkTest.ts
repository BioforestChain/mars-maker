import { Resolve } from "@bfchain/util";
const { MedicalSDK } = require("../cjs");

export class SDKTest {
    constructor() {}

    async process() {
        const sdk: any = Resolve(MedicalSDK);
        sdk.init({ ip: "192.168.110.51", port: 19003, timeout: 10000 });
        const d1 = Date.now();
        await sdk.searchCaseOnChain({});
        console.log(`cost:${Date.now() - d1}`);
    }
}

(async () => {
    const test = new SDKTest();
    await test.process();
    process.exit(0);
})();
