// lib/api/busapi/Bustime.ts
import { BusTime, ResponseBusTime } from "@/src/types/Bus";

export default async function getAllBusTime(): Promise<BusTime[]> {
    const BASE_URL = process.env.BUS_API;

    if (!BASE_URL) {
        throw new Error("APIのURLが設定されていません");
    }

    const allBusTimes: BusTime[] = [];
    let offset = 0;

    while (true) {
        const response = await fetch(`${BASE_URL}?offset=${offset}`);
        if (!response.ok) {
            throw new Error("外部API呼び出しに失敗しました");
        }

        const data: ResponseBusTime = await response.json();

        if (!data.busState?.IsExist) {
            break;
        }

        allBusTimes.push({
            busId: offset,
            busTime: data.nextHourToYakusa * 60 + data.nextMinuteToYakusa,
        });

        offset++;
    }

    return allBusTimes;
}
