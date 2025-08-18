// pages/api/getprediction.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const BASE_URL = process.env.STAY_WATCH_URL;
const ENDPOINT = process.env.PREDICTION_TIME_API;

export default async function getpredictionHandler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.API_KEY;

    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        return res.status(500).json({ error: "環境変数が不足しています" });
    }

    const query = req.url?.split('?')[1] || '';
    const apiUrl = `${BASE_URL}${ENDPOINT}?${query}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-API-Key': API_KEY,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('外部APIエラー:', errorText);
            return res.status(response.status).json({ error: '外部API取得失敗' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error('API通信失敗:', err);
        return res.status(500).json({ error: 'サーバー側での取得に失敗しました' });
    }
}
