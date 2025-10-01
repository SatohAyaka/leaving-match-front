import { SelectBusTime } from "@/src/types/BusTime";
import { fetchApi } from "../../lib/fetchApi";

export async function postBustime(recommendedId: number, selectBustime: SelectBusTime) {
    const { previousTime, nearestTime, nextTime } = selectBustime;

    const bustimeId = await fetchApi<number>(
        `/api/bustime/${recommendedId}?previous=${previousTime}&nearest=${nearestTime}&next=${nextTime}`,
        { method: "POST" }
    );
    return bustimeId;
}