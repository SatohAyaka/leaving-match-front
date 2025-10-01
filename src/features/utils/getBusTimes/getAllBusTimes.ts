import { BusTime } from "@/src/types/Bus";
import { fetchApi } from "../../lib/fetchApi";

export async function GetBusTime(): Promise<BusTime[]> {
    const allTimes = await fetchApi<BusTime[]>(`api/allBustime`);
    return allTimes;

}