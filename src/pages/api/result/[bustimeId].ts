// pages/api/result/[bustimeId].ts

import { stringTimeToNumber } from '@/src/features/utils/recommendedDepartureTime/stringTimeToNumber';
import { Result, ResultResponce } from '@/src/types/Result';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_RESULT;

async function postResultHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { bustimeId } = req.query;
    if (typeof bustimeId !== 'string') {
        return res.status(400).json({ error: "busTimeIdは必須です" });
    }
    const safeBustimeId = String(Number(bustimeId));

    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${safeBustimeId}`);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data = await response.json();
        const resultId = data.result_id;
        return res.status(200).json(resultId);
    } catch (err) {
        console.error('API通信失敗:', err);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
}
async function getResultHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { bustimeId } = req.query;
    if (typeof bustimeId !== 'string') {
        return res.status(400).json({ error: "busTimeIdは必須です" });
    }
    const safeBustimeId = String(Number(bustimeId));

    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${safeBustimeId}`);

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
            BusTimeId: data.BusTimeId,
            BusTime: stringTimeToNumber(timeStr),
            Member: data.Member,
            serverNow: jstNow.toISOString().substring(11, 16)
        };
        return res.status(response.status).json(converted);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return postResultHandler(req, res);
    } else if (req.method === "GET") {
        return getResultHandler(req, res);
    } else {
        return res.status(405).json({ error: "Method Not Allowed" });
    }
}