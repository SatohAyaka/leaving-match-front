import { usePrediction } from "@/src/types/Prediction";

export function getSectionMembers(min: number, max: number, prediction: usePrediction[]): number[] {
    const member: number[] = prediction.filter(
        (prediction) => prediction.predictionTime >= min && prediction.predictionTime <= max
    ).map((prediction) => prediction.id);
    return member;
}