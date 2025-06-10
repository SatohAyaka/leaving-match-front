const BASE_URL = process.env.REACT_APP_STAY_WATCH_URL;
const GET_PREDICTION = process.env.REACT_APP_PREDICTION_TIME_API;

import { Prediction, GetPrediction, usePrediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "../recommendedDepartureTime/stringTimeToNumber";

export async function getPredicton(weekDay: number, stayers: number[]) {
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    stayers.forEach(id => query.append("user-id", id.toString()));
    const apiUrl = `${BASE_URL}${GET_PREDICTION}?${query.toString()}`;
    console.log(apiUrl);
    const response = await fetch(`${apiUrl}`);

    if (!response.ok) {
        throw new Error(`予測帰宅時刻取得失敗: ${response.status}`);
    }

    const usersPrediction: GetPrediction = await response.json();
    const predictions: Prediction[] = usersPrediction.result;
    const predictionNumbers: usePrediction[] = predictions.map((predictions) => ({
        ...predictions,
        predictionTime: stringTimeToNumber(predictions.predictionTime),
    }));
    // const predictionTimes: string[] = predictions.map(p => p.predictionTime);

    return predictionNumbers;
}
