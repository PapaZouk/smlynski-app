export function getCachedData(key: string, expiry: number) {
    const cached = localStorage.getItem(key);

    if (cached) {
        const { data, timestamp } = JSON.parse(cached);

        if (Date.now() - timestamp < expiry) {
            return data;
        }
    }

    return null;
}

export function setCachedData<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

export function clearCache() {
    localStorage.clear();
}