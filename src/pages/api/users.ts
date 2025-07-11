// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const ENDPOINT = process.env.NEXT_PUBLIC_USERS_API;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.API_KEY;
    if (API_KEY == '') {
        console.error('APIキー取得エラー');
    }

    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        return res.status(500).json({ error: '環境変数が未設定です' });
    }

    try {
        const apiRes = await fetch(`${BASE_URL}${ENDPOINT}`, {
            headers: {
                'X-API-Key': API_KEY
            }
        });

        if (!apiRes.ok) {
            const errorText = await apiRes.text();
            console.error('外部APIエラー:', errorText);
            return res.status(apiRes.status).json({ error: '外部API取得失敗' });
        }

        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API通信エラー:', error);
        res.status(500).json({ error: '内部サーバーエラー' });
    }
}
