import { ConvertBusTime } from "@/src/types/BusTime";
import { fetchApi } from "../../lib/fetchApi";

export async function getLatestBustime(): Promise<ConvertBusTime> {
    const bustimeId = await fetchApi<number>("/api/bustime/latest");
    const bustimeData = await fetchApi<ConvertBusTime>(`/api/bustime/${bustimeId}`);
    return bustimeData;
}