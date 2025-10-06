import { usePrediction } from "@/src/types/Prediction";

export const timeSort = (prediction: usePrediction[]) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const predictionTimes = prediction
        .map((prediction) => (prediction.predictionTime))
        .filter(time => time >= currentMinutes)
        .sort((a, b) => a - b);
    return predictionTimes;
}