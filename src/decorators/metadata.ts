/**Map<pathname, handlerName> */

class MetaDataMap<KDefault = string, VDefault = string> {
    private __storages = new Map<Object, Map<KDefault, VDefault>>();

    forceGet(constructor: Object) {
        let storage = this.__storages.get(constructor);
        if (storage === undefined) {
            storage = new Map<KDefault, VDefault>();
            this.__storages.set(constructor, storage);
        }
        return storage;
    }

    get storages() {
        return this.__storages;
    }
}

export const metadataMap = new MetaDataMap<string, string>();
