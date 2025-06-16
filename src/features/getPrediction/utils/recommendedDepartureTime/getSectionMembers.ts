import { usePrediction } from "@/src/types/Prediction";

export function getSectionMembers(min: number, max: number, prediction: usePrediction[]): number[] {
    const memberId: number[] = prediction.filter(
        (prediction) => prediction.predictionTime >= min && prediction.predictionTime <= max
    ).map(
        prediction => prediction.userId
    );
    return memberId;
}