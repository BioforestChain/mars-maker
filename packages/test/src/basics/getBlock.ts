import type {} from "@bfchain/coretools";
import { Sdk } from "@bfchain/pc-sdk";

(async () => {
    try {
        const sdk = new Sdk();

        const result = await sdk.api.basic.getBlock({ height: 1 });

        console.log(result);
    } catch (e: any) {
        console.log(e);
    }
})();
