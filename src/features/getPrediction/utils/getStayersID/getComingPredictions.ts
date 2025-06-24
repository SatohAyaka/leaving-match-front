import { GetPredictionTime, Probability } from "@/src/types/Prediction";

const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const GET_PROBABILITY = process.env.NEXT_PUBLIC_PREDICTION_PROBABILITY_API;

//全ユーザから来訪予測が50％?以上の人を抽出

export async function getComingPredictions(weekDay: number, users: number[]): Promise<number[]> {
    const predictionBorder = 0.50;
    const query = new URLSearchParams({
        weekday: weekDay.toString(),
    });
    users.forEach(id => query.append("user-id", id.toString()));
    const apiUrl = `${BASE_URL}${GET_PROBABILITY}?${query.toString()}`;
    console.log(apiUrl);
    const response = await fetch(`${apiUrl}`);

    if (!response.ok) {
        throw new Error(`予測滞在者情報取得失敗: ${response.status}`);
    }

    const comingUsersData: GetPredictionTime = await response.json();
    const probability: Probability[] = comingUsersData.result;
    const comingUserId: number[] = probability
        .filter((user) => user.probability > predictionBorder)
        .map((user) => user.userId);
    // return probability;
    return comingUserId;
}
