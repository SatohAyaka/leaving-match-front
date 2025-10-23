// lib/api/bustime/getBustime.ts

import { ConvertBusTime, ResponseBustimeData } from '@/src/types/BusTime';
import { numberTimeToString } from '@/src/utils/numberTimeToString';
import { stringTimeToNumber } from '@/src/utils/stringTimeToNumber';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

export default async function getBusTime(bustimeId: number): Promise<ConvertBusTime> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);
    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`外部API呼び出しに失敗しました: ${response.status}`);
    }

    const bustimeData: ResponseBustimeData[] = await response.json();
    if (bustimeData.length === 0) {
        throw new Error("BusTimeデータが存在しません");
    }
    const convertPrevious = stringTimeToNumber(bustimeData[0].PreviousTime);
    const convertNearest = stringTimeToNumber(bustimeData[0].NearestTime);
    const convertNext = stringTimeToNumber(bustimeData[0].NextTime);
    const convertEnd = stringTimeToNumber(bustimeData[0].EndTime);

    const converted: ConvertBusTime = {
        bustimeId: bustimeData[0].BusTimeId,
        previousTime: numberTimeToString(convertPrevious),
        nearestTime: numberTimeToString(convertNearest),
        nextTime: numberTimeToString(convertNext),
        endTime: numberTimeToString(convertEnd),
    };
    return converted;
}