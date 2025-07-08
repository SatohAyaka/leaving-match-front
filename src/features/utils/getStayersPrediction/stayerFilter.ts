import { userNamePrediction } from "@/src/types/Prediction";

export function stayerPredictions(predictions: userNamePrediction[], stayers: number[]) {
    return predictions.filter(prediction => stayers.includes(prediction.id));
}