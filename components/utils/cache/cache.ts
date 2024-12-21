const cacheStore: Record<string, { data: any, timestamp: number }> = {};

export function getCachedData(key: string, expiry: number) {
    const cached = cacheStore[key];

    if (cached) {
        if (Date.now() - cached.timestamp < expiry) {
            return cached.data;
        } else {
            delete cacheStore[key];
        }
    }

    return null;
}

export function setCachedData<T>(key: string, data: T) {
    cacheStore[key] = { data, timestamp: Date.now() };
}

export function clearCache() {
    for (const key in cacheStore) {
        delete cacheStore[key];
    }
}
