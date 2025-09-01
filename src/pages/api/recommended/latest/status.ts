// pages/api/recommended/latest/status.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_RECOMMENDED;
const LATEST_ENDPOINT = process.env.LATEST_EMDPOINT;
const ENDPOINT = process.env.STATUS_ENDPOINT;

export default async function getLatestStatusHandler(req: NextApiRequest, res: NextApiResponse) {
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
        if (typeof data !== "boolean") {
            return res
                .status(500)
                .json({ error: "外部APIのレスポンス形式が不正です" });
        }

        return res.status(200).json(data);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}