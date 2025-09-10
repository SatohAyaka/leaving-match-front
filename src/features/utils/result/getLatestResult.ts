import { Result } from "@/src/types/Result";

export async function getLatestResult(): Promise<Result> {
    const response = await fetch(`/api/bustime/latest`);
    if (!response.ok) {
        throw new Error(`BustimeId取得失敗: ${response.status}`);
    }
    const bustimeId: number = await response.json();
    const resultResponse = await fetch(`/api/result/${bustimeId}`);
    if (!resultResponse.ok) {
        throw new Error(`Result_Data取得失敗: ${resultResponse.status}`);
    }
    const resultData: Result = await resultResponse.json();
    return resultData;
}