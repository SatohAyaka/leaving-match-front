// pages/api/prediction/[bustimeId]/[userId].ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_PREDICTION;

export default async function postPredictionHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { busTimeId, userId } = req.query;
    if (typeof busTimeId !== 'string' || typeof userId !== 'string') {
        return res.status(400).json({ error: "busTimeIdとuserIdは必須です" });
    }
    const otherParams = { ...req.query };
    delete otherParams.busTimeId;
    delete otherParams.userId;
    if (typeof otherParams.time === "string") {
        otherParams.time = String(Number(otherParams.time));
    }

    const url = new URL(`${ENDPOINT}/${busTimeId}/${userId}`, BASE_URL);
    Object.entries(otherParams).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, String(value));
        }
    });

    const apiUrl = url.toString();

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}