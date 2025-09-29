import { SelectBusTime } from "@/src/types/BusTime";

export async function postBustime(recommendedId: number, selectBustime: SelectBusTime) {
    const previous = selectBustime.previousTime;
    const nearest = selectBustime.nearestTime;
    const next = selectBustime.nextTime;

    const response = await fetch(`${process.env.BASE_URL}/api/bustime/${recommendedId}?previous=${previous}&nearest=${nearest}&next=${next}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`BustimeId取得失敗: ${response.status}`);
    }
    const bustimeId: number = await response.json();
    return bustimeId;
}