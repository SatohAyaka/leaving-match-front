import { usePrediction } from "@/src/types/Prediction";

export function getSectionMembers(min: number, max: number, prediction: usePrediction[]): usePrediction[] {
    const member: usePrediction[] = prediction.filter(
        (prediction) => prediction.predictionTime >= min && prediction.predictionTime <= max
    ).map(
        prediction => prediction
    );
    return member;
}