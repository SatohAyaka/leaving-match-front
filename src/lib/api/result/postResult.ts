// lib/api/result/postResult.ts

import { ResultResponce } from "@/src/types/Result";

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_RESULT;

export default async function postResult(bustimeId: number): Promise<ResultResponce> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }

    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    const resultData = await response.json();
    return resultData;
}