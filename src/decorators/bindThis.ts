const BINDED_THIS_PROPS = Symbol("bindThisProps");
export function BindThis() {
    return <T extends Function>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        if (!descriptor || typeof descriptor.value !== "function") {
            throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
        }
        return {
            configurable: true,
            get(this: T & { [BINDED_THIS_PROPS]?: Set<string> }): T {
                let cacheSet = this[BINDED_THIS_PROPS];
                if (!cacheSet) {
                    this[BINDED_THIS_PROPS] = cacheSet = new Set();
                }
                if (cacheSet.has(propertyKey)) {
                    return descriptor.value!;
                }
                const value: T = descriptor.value!.bind(this);
                Object.defineProperty(this, propertyKey, {
                    value,
                    configurable: true,
                    writable: true,
                });
                cacheSet.add(propertyKey);
                return value;
            },
        };
    };
}
