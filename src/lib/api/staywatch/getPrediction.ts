// lib/api/getprediction.ts

import { stringTimeToNumber } from "@/src/utils/stringTimeToNumber";
import { GetPrediction, Prediction, usePrediction } from "@/src/types/Prediction";

const BASE_URL = process.env.STAY_WATCH_URL;
const ENDPOINT = process.env.PREDICTION_TIME_API;

export default async function getprediction(weekDay: number, stayers: number[]): Promise<usePrediction[]> {
    const API_KEY = process.env.API_KEY;

    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        throw new Error("環境変数が不足しています");
    }

    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    stayers.forEach(user => query.append("user-id", user.toString()));

    const apiUrl = `${BASE_URL}${ENDPOINT}?${query.toString()}`;

    const response = await fetch(apiUrl, {
        headers: {
            'X-API-Key': API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }

    const usersPrediction: GetPrediction = await response.json();
    const predictions: Prediction[] = usersPrediction.result;
    const converted: usePrediction[] = predictions
        .filter(prediction => prediction.predictionTime)
        .map((predictions) => ({
            id: predictions.userId,
            predictionTime: stringTimeToNumber(predictions.predictionTime),
        }));
    return converted;
}
