// pages/api/recommendedBustime.ts

import { error } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

async function postBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    return res.status(201).json({ message: 'BusTimeカラムの追加成功' });
}
async function getBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }

    const query = new URLSearchParams(req.query as Record<string, string>).toString();
    const apiUrl = `${BASE_URL}${ENDPOINT}?${query}`
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();
        return res.status(200).json(data);
    } catch {
        console.error("API呼び出し中にエラーが発生:", error);
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