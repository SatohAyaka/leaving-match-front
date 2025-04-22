const BASE_URL = process.env.REACT_APP_STAY_WATCH_URL;
const GET_STAYERS_API = '/api/v1/stayers';

import Stayer from "../../types/Stayer";

export async function getStayers(): Promise<Stayer[]> {
    const response = await fetch(`${BASE_URL}${GET_STAYERS_API}`);

    if (!response.ok) {
        throw new Error(`滞在者情報取得失敗: ${response.status}`);
    }

    const data: Stayer[] = await response.json();
    console.log(data);
    return data;
}
