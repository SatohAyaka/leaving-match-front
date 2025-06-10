import { Prediction } from "@/src/types/Prediction";
import { stringTimeToNumber } from "./stringTimeToNumber";

export const findMaxCountInterval = (prediction: Prediction[], width: number): [number, number, number] => {
    const predictionTimes = prediction.map((prediction) => (prediction.predictionTime));
    // 時刻をstring→number（hour*60+minute）
    const timeToNumber: number[] = predictionTimes.map(stringTimeToNumber
    ).sort((a, b) => a - b);
    let maxCount = 0;
    let bestStart = 0;
    let left = 0;


    for (let right = 0; right < timeToNumber.length; right++) {
        while (timeToNumber[right] - timeToNumber[left] >= width) {
            left++;
        }
        const count = right - left + 1;
        if (count > maxCount) {
            maxCount = count;
            bestStart = timeToNumber[left];
        }
    }
    return [
        bestStart, bestStart + width, maxCount,
    ];
}