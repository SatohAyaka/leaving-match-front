// pages/api/recommendedBustime.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

async function postBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { previous, nearest, next } = req.query;

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
    const apiUrl = `${BASE_URL}${ENDPOINT}?${searchParams.toString()}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({
                error: "外部API呼び出しに失敗しました",
                detail: errorData,
            });
        }

        const data = await response.json();
        return res.status(200).json({ bustime_id: data.bustime_id });
    } catch (err) {
        console.error('API通信失敗:', err);
        res.status(500).json({ error: 'サーバー側での取得に失敗しました' });
    }
}
async function getBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }

    const query = new URLSearchParams(req.query as Record<string, string>).toString();
    const apiUrl = query
        ? `${BASE_URL}${ENDPOINT}?${query}`
        : `${BASE_URL}${ENDPOINT}`;

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

export default async function recommendedBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        return postBustimeHandler(req, res);
    } else if (req.method === 'GET') {
        return getBustimeHandler(req, res);
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}