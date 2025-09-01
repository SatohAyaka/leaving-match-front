// pages/api/recommended/latest/members.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_RECOMMENDED;
const LATEST_ENDPOINT = process.env.LATEST_EMDPOINT;
const ENDPOINT = process.env.MEMBER_ENDPOINT;

export default async function getLatestMemberHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ROUTER_PARAMS || !LATEST_ENDPOINT || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${LATEST_ENDPOINT}${ENDPOINT}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();

        if (!Array.isArray(data) || !data.every(item => typeof item === "number")) {
            return res.status(500).json({ error: "外部APIのレスポンス形式が不正です" });
        }

        return res.status(200).json(data as number[]);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}