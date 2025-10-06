// lib/api/result/getResult.ts

import { stringTimeToNumber } from '@/src/utils/stringTimeToNumber';
import { Result, ResultResponce } from '@/src/types/Result';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_RESULT;

export default async function getResult(bustimeId: number): Promise<Result> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }

    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    const data: ResultResponce = await response.json();
    const timeStr = data.BusTime.split("T")[1].slice(0, 5);
    const now = new Date();
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const converted: Result = {
        BusTimeId: data.BusTimeId,
        BusTime: stringTimeToNumber(timeStr),
        Member: data.Member,
        serverNow: jstNow.toISOString().substring(11, 16)
    };
    return converted;
}
