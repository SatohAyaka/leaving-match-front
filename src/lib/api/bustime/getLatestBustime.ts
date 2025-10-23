// lib/api/bustime/getLatestBustime.ts

import { ConvertBusTime } from '@/src/types/BusTime';
import getBusTime from './getBustime';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ROUTER_PARAMS = process.env.LEAVING_MATCH_BUSTIME;
const ENDPOINT = process.env.LATEST_ENDPOINT;

export default async function getLatestBusTime(): Promise<ConvertBusTime> {
    if (!BASE_URL || !ROUTER_PARAMS || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const apiUrl = new URL(`${BASE_URL}${ROUTER_PARAMS}${ENDPOINT}`);

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`外部API呼び出しに失敗しました: ${response.status}`);
    }
    const responseData = await response.text();
    const bustimeId = Number(responseData.trim());

    if (isNaN(bustimeId)) {
        throw new Error("APIから不正なデータが返却されました");
    }

    const bustimeData = getBusTime(bustimeId);
    return bustimeData;
}