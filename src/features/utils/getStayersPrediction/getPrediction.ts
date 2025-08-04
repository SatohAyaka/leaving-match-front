import { Prediction, GetPrediction, userNamePrediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "../recommendedDepartureTime/stringTimeToNumber";
import { UserData } from "@/src/types/Stayer";
import userIdToName from "../getStayersID/userIdToUserName";

export async function getPredicton(weekDay: number, allUsers: UserData[]): Promise<userNamePrediction[]> {
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    allUsers.forEach(user => query.append("user-id", user.id.toString()));
    const response = await fetch(`/api/getPrediction?${query.toString()}`);

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
