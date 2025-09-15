// pages/api/result/[bustimeId].ts

import { stringTimeToNumber } from '@/src/features/utils/recommendedDepartureTime/stringTimeToNumber';
import { Result, ResultResponce } from '@/src/types/Result';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_RESULT;
const ENDPOINT = process.env.LATEST_ENDPOINT;

export default async function getLatestResultHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ROUTER_PARAMS || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }

    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${ENDPOINT}`);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data: ResultResponce = await response.json();
        const timeStr = data.BusTime.split("T")[1].slice(0, 5);
        const now = new Date();
        const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const converted: Result = {
            BustimeId: data.BusTimeId,
            Bustime: stringTimeToNumber(timeStr),
            Member: data.Member,
            serverNow: jstNow.toISOString().substring(11, 16)
        };
        return res.status(response.status).json(converted);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}
