export namespace MetroCache {
    export type CacheStore<T> = {
        get: (key: Buffer) => T | null | undefined | Promise<T | null | undefined>;
        set(key: Buffer, value: T): void | Promise<void>;
        clear(): void | Promise<void>;
    } & Record<string, unknown>;

    export type MetroCache = {
        AutoCleanFileStore: any;
        Cache: any;
        FileStore: any;
        HttpGetStore: any;
        HttpStore: any;
        stableHash: any;
    };
}
