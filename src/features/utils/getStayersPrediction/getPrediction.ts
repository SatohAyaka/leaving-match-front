import { Prediction, GetPrediction, usePrediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "../recommendedDepartureTime/stringTimeToNumber";
import { UserData } from "@/src/types/Stayer";
import userIdToName from "../getStayersID/userIdToUserName";

export async function getPredicton(weekDay: number, stayers: number[]): Promise<usePrediction[]> {
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    stayers.forEach(user => query.append("user-id", user.toString()));
    const response = await fetch(`/api/getPrediction?${query.toString()}`);

    if (!response.ok) {
        throw new Error(`予測帰宅時刻取得失敗: ${response.status}`);
    }

    const usersPrediction: GetPrediction = await response.json();
    const predictions: Prediction[] = usersPrediction.result;
    const predictionNumbers: usePrediction[] = predictions
        .filter(prediction => prediction.predictionTime)
        .map((predictions) => ({
            id: predictions.userId,
            predictionTime: stringTimeToNumber(predictions.predictionTime),
        }));

    return predictionNumbers;
}
