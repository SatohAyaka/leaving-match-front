import { usePrediction } from "@/src/types/Prediction";

export const timeSort = (prediction: usePrediction[]) => {
    const predictionTimes = prediction.map((prediction) => (prediction.predictionTime)).sort((a, b) => a - b);
    return predictionTimes;
}