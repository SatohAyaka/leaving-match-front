const BASE_URL = process.env.REACT_APP_STAY_WATCH_URL;
const GET_STAYERS = process.env.REACT_APP_STAYERS_API;

import Stayer from "../../types/Stayer";

export async function getStayers(): Promise<number[]> {
    const response = await fetch(`${BASE_URL}${GET_STAYERS}`);

    if (!response.ok) {
        throw new Error(`滞在者情報取得失敗: ${response.status}`);
    }

    const stayersData: Stayer[] = await response.json();
    const userId = stayersData.map((stayer) => stayer.id)
    return userId;
}
