// pages/api/prediction/[bustimeId].ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_PREDICTION;

export default async function getPredictionHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }

    const { bustimeId } = req.query;
    if (typeof bustimeId !== 'string') {
        return res.status(400).json({ error: "busTimeIdは必須です" });
    }

    const apiUrl = `${BASE_URL}${ENDPOINT}/${bustimeId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }

}