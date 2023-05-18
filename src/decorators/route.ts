import { metadataMap } from "./metadata";

export function Route(pathname: TransactionMaker.Server.PATH_NAME_TYPE) {
    return <T extends Function>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const storage = metadataMap.forceGet(target);
        storage.set(pathname, propertyKey);
    };
}
