// pages/api/result/latest

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_BUSTIME;
const ENDPOINT = process.env.LATEST_ENDPOINT;

export default async function getLatestBusTimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ROUTER_PARAMS || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${ENDPOINT}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const result = await response.text();
        const resultId = Number(result.trim());

        if (isNaN(resultId)) {
            return res.status(500).json({ error: "APIから不正なデータが返却されました" });
        }

        return res.status(200).json(resultId);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}