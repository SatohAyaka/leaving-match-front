// lib/api/recommended.ts

import { Recommended } from '@/src/types/Recommended';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_RECOMMENDED;

export default async function postRecommended(recommendedTime: number, memberIds: number[]): Promise<Recommended> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const query = new URLSearchParams({
        time: recommendedTime.toString(),
    });
    memberIds.forEach(id => query.append("member", id.toString()));

    const apiUrl = `${BASE_URL}${ENDPOINT}?${query}`;
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    const recommended: Recommended = await response.json();
    return recommended;
}