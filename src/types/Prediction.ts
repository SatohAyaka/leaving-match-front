export type Prediction = {
    userId: number,
    predictionTime: string
}

export type GetPrediction = {
    weekday: number,
    result: Prediction[]
}

export type Probability = {
    userId: number,
    probability: number
}

export type GetPredictionTime = {
    weekday: number,
    time: string,
    isForward: boolean,
    result: Probability[]
}