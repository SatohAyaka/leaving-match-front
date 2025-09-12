export type SelectBusTime = {
    previousTime: number;
    nearestTime: number;
    nextTime: number;
}

export type ConvertBusTime = {
    bustimeId: number;
    previousTime: string;
    nearestTime: string;
    nextTime: string;
    endTime: string;
    serverNow: string;
};

export type ResponseBustimeData = {
    BusTimeId: number;
    RecommendedId: number;
    PreviousTime: string;
    NearestTime: string;
    NextTime: string;
    CreatedDate: string;
    EndTime: string;
}