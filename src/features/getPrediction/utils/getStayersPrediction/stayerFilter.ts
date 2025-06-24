import { usePrediction } from "@/src/types/Prediction";

export function stayerPredictions(predictions: usePrediction[], stayers: number[]) {
    return predictions.filter(prediction => stayers.includes(prediction.userId));
}