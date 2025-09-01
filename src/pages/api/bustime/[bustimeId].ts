// pages/api/bustime/[bustimeId].ts

import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

export default async function getBusTimeHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { bustimeId } = req.query;
    if (typeof bustimeId !== 'string') {
        return res.status(400).json({ error: "busTimeIdは必須です" });
    }
    const safeBustimeId = String(Number(bustimeId));

    const apiUrl = new URL(`${ENDPOINT}/${safeBustimeId}`, BASE_URL).toString();
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();
        const converted = {
            bustimeId: data.busTimeId,
            previousTime: new Date(data.previousTime).toISOString().substring(11, 16),
            nearestTime: new Date(data.nearestTime).toISOString().substring(11, 16),
            nextTime: new Date(data.nextTime).toISOString().substring(11, 16),
            endTime: new Date(data.createdDate).toISOString().substring(11, 16),
        };
        return res.status(200).json(converted);
    } catch (err) {
        console.error('API通信失敗:', err);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
}