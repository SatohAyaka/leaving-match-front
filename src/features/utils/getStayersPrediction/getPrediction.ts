const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const GET_PREDICTION = process.env.NEXT_PUBLIC_PREDICTION_TIME_API;

import { Prediction, GetPrediction, userNamePrediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "../recommendedDepartureTime/stringTimeToNumber";
import { UserData } from "@/src/types/Stayer";
import userIdToName from "../getStayersID/userIdToUserName";

export async function getPredicton(weekDay: number, allUsers: UserData[]): Promise<userNamePrediction[]> {
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    allUsers.forEach(id => query.append("user-id", id.toString()));
    const apiUrl = `${BASE_URL}${GET_PREDICTION}?${query.toString()}`;
    console.log(apiUrl);
    const response = await fetch(`${apiUrl}`);

    if (!response.ok) {
        throw new Error(`予測帰宅時刻取得失敗: ${response.status}`);
    }

    const usersPrediction: GetPrediction = await response.json(); //取得JSON
    const predictions: Prediction[] = usersPrediction.result; //JSONから中身のみ取り出し
    const predictionNumbers: userNamePrediction[] = predictions
        .filter(prediction => prediction.predictionTime)
        .map((predictions) => ({
            id: predictions.userId,
            name: userIdToName(allUsers, predictions.userId),
            predictionTime: stringTimeToNumber(predictions.predictionTime),
        }));
    // const predictionTimes: string[] = predictions.map(p => p.predictionTime);

    return predictionNumbers;
}
