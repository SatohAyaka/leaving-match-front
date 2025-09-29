import { BusTime } from "@/src/types/Bus";

export async function GetBusTime(): Promise<BusTime[]> {
    const res = await fetch(`${process.env.REACT_API}/api/allBustime`);
    if (!res.ok) {
        throw new Error(`バス時刻の取得に失敗: ${res.status}`);
    }

    const allTimes: BusTime[] = await res.json();
    return allTimes;

}