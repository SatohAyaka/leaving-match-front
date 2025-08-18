// pages/api/prediction/[bustimeId].ts

import { stringTimeToNumber } from '@/src/features/utils/recommendedDepartureTime/stringTimeToNumber';
import { PredictionData, usePrediction } from '@/src/types/Prediction';
import type { NextApiRequest, NextApiResponse } from 'next';


const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_PREDICTION;

export default async function getPredictionHandler(req: NextApiRequest, res: NextApiResponse) {
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
        const data: PredictionData[] = await response.json();
        const converted: usePrediction[] = data.map(predictionData => {
            const timeStr = new Date(predictionData.PredictionTime)
                .toISOString()
                .substring(11, 16); // "HH:mm"

            return {
                id: predictionData.UserId,
                predictionTime: stringTimeToNumber(timeStr),
            };
        });

        return res.status(200).json(converted);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }

}