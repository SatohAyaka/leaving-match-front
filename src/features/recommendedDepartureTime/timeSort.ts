import { Prediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "./stringTimeToNumber";

export const timeSort = (prediction: Prediction[]) => {
    const predictionTimes = prediction.map((prediction) => (prediction.predictionTime));
    // 時刻をstring→number（hour*60+minute）
    const timeToNumber: number[] = predictionTimes.map(stringTimeToNumber
    ).sort((a, b) => a - b);
    return timeToNumber;
}