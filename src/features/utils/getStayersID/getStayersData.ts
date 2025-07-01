import { Stayer } from "@/src/types/Stayer";

const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const GET_STAYERS = process.env.NEXT_PUBLIC_STAYERS_API;


export async function getStayers(): Promise<number[]> {
    const response = await fetch(`${BASE_URL}${GET_STAYERS}`);

    if (!response.ok) {
        throw new Error(`滞在者情報取得失敗: ${response.status}`);
    }

    const stayersData: Stayer[] = await response.json();
    const userId: number[] = stayersData.map((stayer) => stayer.id)
    console.log(userId);
    return userId;
}
