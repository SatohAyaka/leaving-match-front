// src/feature/lib/fetchApi.ts
export async function fetchApi<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const baseUrl =
        typeof window === "undefined"
            ? process.env.NEXT_PUBLIC_API_BASE_URL || "https://leaving-match.vercel.app"
            : "";

    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
    });

    if (!res.ok) {
        throw new Error(`API呼び出し失敗: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<T>;
}
