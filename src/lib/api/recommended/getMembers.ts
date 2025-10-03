// lib/api/recommended/getMembers.ts

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_RECOMMENDED;
const LATEST_ENDPOINT = process.env.LATEST_EMDPOINT;
const ENDPOINT = process.env.MEMBER_ENDPOINT;

export default async function getLatestMember(): Promise<number[]> {
    if (!BASE_URL || !ROUTER_PARAMS || !LATEST_ENDPOINT || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${LATEST_ENDPOINT}${ENDPOINT}`);

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    const data = await response.json();

    if (!Array.isArray(data) || !data.every(item => typeof item === "number")) {
        throw new Error("外部APIのレスポンス形式が不正です");
    }

    return data as number[];
}