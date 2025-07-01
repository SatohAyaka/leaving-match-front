export type Prediction = {
    userId: number,
    userName: string,
    predictionTime: string
}

export type GetPrediction = {
    weekday: number,
    result: Prediction[]
}

export type usePrediction = {
    userId: number,
    userName: string,
    predictionTime: number
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