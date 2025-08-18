// pages/api/stayers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const BASE_URL = process.env.STAY_WATCH_URL;
const ENDPOINT = process.env.STAYERS_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.API_KEY;
    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        return res.status(500).json({ error: "環境変数が不足しています" });
    }

    try {
        const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
            headers: {
                'X-API-Key': API_KEY || ''
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('外部APIエラー:', errorText);
            return res.status(response.status).json({ error: '外部APIの取得に失敗しました' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error('API呼び出し失敗:', err);
        res.status(500).json({ error: '内部サーバーエラー' });
    }
}
