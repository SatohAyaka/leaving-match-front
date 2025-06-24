export type ResponseBusTime = {
    schedule: string,
    busState:
    {
        IsFirst: boolean,
        IsExist: boolean,
    },
    nextHourToAIT: number,
    nextMinuteToAIT: number,
    nextHourToYakusa: number,
    nextMinuteToYakusa: number,
};

export type BusTime = {
    busId: number,
    busTime: number, //hour*60+minuteで管理　hour*100+minuteでもいいっちゃいいけど対応する時間ない場合に困る　
}