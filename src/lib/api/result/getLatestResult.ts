// lib/api/result/getLatestResult.ts

import { stringTimeToNumber } from '@/src/utils/stringTimeToNumber';
import { Result, ResultResponce } from '@/src/types/Result';
import { dateJadge } from '@/src/utils/dateJadge';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_RESULT;
const ENDPOINT = process.env.LATEST_ENDPOINT;

export default async function getLatestResult(): Promise<Result | null> {
    if (!BASE_URL || !ROUTER_PARAMS || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }

    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${ENDPOINT}`);

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
        if (response.status === 404) {
            console.warn("Result データが存在しません（テーブル空）");
            return null;
        }
        throw new Error("外部API呼び出しに失敗しました");
    }
    const data: ResultResponce = await response.json();
    const timeStr = data.BusTime.split("T")[1].slice(0, 5);

    const isSameDate = dateJadge(data.BusTime);

    const converted: Result = {
        BusTimeId: data.BusTimeId,
        BusTime: stringTimeToNumber(timeStr),
        Member: data.Member,
        dateJadge: isSameDate,
    };
    return converted;
}
