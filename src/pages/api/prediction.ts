// pages/api/prediction.ts
import type { NextApiRequest, NextApiResponse } from 'next';
const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const PREDICTION_API = process.env.NEXT_PUBLIC_PREDICTION_TIME_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.API_KEY;
    if (API_KEY == '') {
        console.error('APIキー取得エラー');
    }

    if (!BASE_URL || !PREDICTION_API || !API_KEY) {
        return res.status(500).json({ error: "環境変数が不足しています" });
    }

    const query = req.url?.split('?')[1] || '';
    const apiUrl = `${BASE_URL}${PREDICTION_API}?${query}`;

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
    } catch (error) {
        console.error('API通信失敗:', error);
        res.status(500).json({ error: 'サーバー側での取得に失敗しました' });
    }
}
