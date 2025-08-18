// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.STAY_WATCH_URL;
const ENDPOINT = process.env.USERS_API;

export default async function usersHandler(req: NextApiRequest, res: NextApiResponse) {
    const API_KEY = process.env.API_KEY;
    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        return res.status(500).json({ error: "環境変数が不足しています" });
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
            return res.status(apiRes.status).json({ error: '外部API呼び出しに失敗しました' });
        }

        const data = await apiRes.json();
        res.status(200).json(data);
    } catch (err) {
        console.error('API通信エラー:', err);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
}
