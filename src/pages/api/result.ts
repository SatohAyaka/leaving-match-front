// pages/api/result.ts

import { stringTimeToNumber } from '@/src/features/utils/recommendedDepartureTime/stringTimeToNumber';
import { Result, ResultResponce } from '@/src/types/Result';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_RESULT;

export default async function getResultHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const query = req.query.id;
    const id = String(Number(query));
    const apiUrl = `${BASE_URL}${ENDPOINT}?${id}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data: ResultResponce[] = await response.json();
        const converted: Result[] = data.map(resultData => {
            const timeStr = new Date(resultData.BusTime)
                .toISOString()
                .substring(11, 16); // "HH:mm"

            return {
                Bustime: stringTimeToNumber(timeStr),
                Member: resultData.Member,
            };
        });
        return res.status(response.status).json(converted);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}