import { userNamePrediction } from "@/src/types/Prediction";

export const timeSort = (prediction: userNamePrediction[]) => {
    const predictionTimes = prediction.map((prediction) => (prediction.predictionTime)).sort((a, b) => a - b);
    return predictionTimes;
}