export type ResultResponce = {
    ResultId: number;
    BusTimeId: number;
    BusTime: string;
    Member: number;
    CreatedDate: string;
}

export type Result = {
    BusTimeId: number;
    BusTime: number;
    Member: number;
    serverNow: string;
    dateJadge: boolean;
}