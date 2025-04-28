export type Prediction = {
    userId: number,
    predictionTime: string
}
export type GetPrediction = {
    weekday: number,
    result: Prediction[]
}