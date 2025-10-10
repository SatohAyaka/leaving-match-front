// lib/api/bustime/postBustime.ts

import { SelectBusTime } from "@/src/types/BusTime";

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_BUSTIME;

export async function postBustime(recommendedId: number, selectBustime: SelectBusTime): Promise<number> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const { previousTime, nearestTime, nextTime } = selectBustime;
    const previous = previousTime.toString();
    const nearest = nearestTime.toString();
    const next = nextTime.toString();

    const searchParams = new URLSearchParams({
        previous,
        nearest,
        next,
    });

    const apiUrl = new URL(`${BASE_URL.replace(/\/$/, "")}/${ENDPOINT.replace(/^\//, "")}/${recommendedId}?${searchParams.toString()}`).toString();
    console.log("postRecommended URL:", apiUrl);

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error(`外部API呼び出しに失敗しました: ${response.status}`);
    }
    const bustimeData = await response.text();
    const bustimeId = Number(bustimeData.trim());
    return bustimeId;
}