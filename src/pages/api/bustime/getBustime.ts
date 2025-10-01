// pages/api/result/latest

import { ConvertBusTime, ResponseBustimeData } from '@/src/types/BusTime';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

export default async function getBusTime(bustimeId: number): Promise<ConvertBusTime> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`外部API呼び出しに失敗しました: ${response.status}`);
    }

    const responseData = await response.json();
    const bustimeData: ResponseBustimeData[] = await responseData.json();
    if (bustimeData.length === 0) {
        throw new Error("BusTimeデータが存在しません");
    }
    const toJstTimeString = (isoStr: string) => {
        const date = new Date(isoStr);
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        return `${hour}:${minute}`;
    };
    const converted: ConvertBusTime = {
        bustimeId: bustimeData[0].BusTimeId,
        previousTime: toJstTimeString(bustimeData[0].PreviousTime),
        nearestTime: toJstTimeString(bustimeData[0].NearestTime),
        nextTime: toJstTimeString(bustimeData[0].NextTime),
        endTime: toJstTimeString(bustimeData[0].EndTime),
        serverNow: new Date().toISOString()
    };
    return converted;
}