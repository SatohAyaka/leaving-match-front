import { userNamePrediction } from "@/src/types/Prediction";
import { UserData } from "@/src/types/Stayer";

export function getSectionMembers(min: number, max: number, prediction: userNamePrediction[]): UserData[] {
    const member: UserData[] = prediction.filter(
        (prediction) => prediction.predictionTime >= min && prediction.predictionTime <= max
    ).map(
        (prediction) => ({
            id: prediction.id,
            name: prediction.name
        })
    );
    return member;
}