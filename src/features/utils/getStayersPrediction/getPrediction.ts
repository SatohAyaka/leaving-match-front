import { Prediction, GetPrediction, usePrediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "../recommendedDepartureTime/stringTimeToNumber";
import { fetchApi } from "../../lib/fetchApi";


export async function getPredicton(weekDay: number, stayers: number[]): Promise<usePrediction[]> {
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    stayers.forEach(user => query.append("user-id", user.toString()));

    const usersPrediction: GetPrediction = await fetchApi<GetPrediction>(
        `/api/getPrediction?${query.toString()}`
    );
    const predictions: Prediction[] = usersPrediction.result;
    const predictionNumbers: usePrediction[] = predictions
        .filter(prediction => prediction.predictionTime)
        .map((predictions) => ({
            id: predictions.userId,
            predictionTime: stringTimeToNumber(predictions.predictionTime),
        }));

    return predictionNumbers;
}
