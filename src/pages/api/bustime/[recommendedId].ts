// pages/api/bustime/[recommendedId].ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

export default async function postBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { recommendedId, previous, nearest, next } = req.query;

    if (
        typeof previous !== "string" ||
        typeof nearest !== "string" ||
        typeof next !== "string"
    ) {
        return res.status(400).json({ error: "パラメータが不正です" });
    }
    const searchParams = new URLSearchParams({
        previous,
        nearest,
        next,
    });
    if (typeof recommendedId !== 'string') {
        return res.status(400).json({ error: "recommendedIdは必須です" });
    }
    const safeRecommendedId = String(Number(recommendedId));

    const apiUrl = new URL(`${ENDPOINT}/${safeRecommendedId}?${searchParams.toString()}`, BASE_URL).toString();
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const bustime = await response.text();
        const bustimeId = Number(bustime.trim());
        return res.status(200).json(bustimeId);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}