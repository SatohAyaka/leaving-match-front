// pages/api/stayers.ts

import { Stayer } from "@/src/types/Stayer";

const BASE_URL = process.env.STAY_WATCH_URL;
const ENDPOINT = process.env.STAYERS_API;

export default async function getStayers(): Promise<number[]> {
    const API_KEY = process.env.API_KEY;
    if (!BASE_URL || !ENDPOINT || !API_KEY) {
        throw new Error("環境変数が不足しています");
    }

    const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
        headers: {
            'X-API-Key': API_KEY || ''
        }
    });

    if (!response.ok) {
        throw new Error(`外部API呼び出しに失敗しました: ${response.status}`);
    }

    const stayersData: Stayer[] = await response.json();
    const stayerIds: number[] = stayersData.map((stayer) => stayer.id);
    return stayerIds;
}
