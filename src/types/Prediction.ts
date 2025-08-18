import { UserData } from "./Stayer"

export type Prediction = {
    userId: number,
    predictionTime: string
}

export type GetPrediction = {
    weekday: number,
    result: Prediction[]
}

export type usePrediction = {
    id: number,
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

export type PredictionData = {
    PredictionId: number;
    BusTimeId: number;
    UserId: number;
    PredictionTime: string;
    CreatedDate: string;
}

export type userNamePrediction = usePrediction & UserData;