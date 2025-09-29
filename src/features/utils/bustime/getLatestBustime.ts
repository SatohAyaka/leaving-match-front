import { ConvertBusTime } from "@/src/types/BusTime";

export async function getLatestBustime(): Promise<ConvertBusTime> {
    const response = await fetch(`${process.env.BASE_URL}/api/bustime/latest`);
    if (!response.ok) {
        throw new Error(`BustimeId取得失敗: ${response.status}`);
    }
    const bustimeId: number = await response.json();

    const responseBustimeData = await fetch(`${process.env.BASE_URL}/api/bustime/${bustimeId}`);
    if (!responseBustimeData.ok) {
        throw new Error(`BusTime_Data取得失敗: ${responseBustimeData.status}`);
    }
    const bustimeData: ConvertBusTime = await responseBustimeData.json();
    return bustimeData;
}