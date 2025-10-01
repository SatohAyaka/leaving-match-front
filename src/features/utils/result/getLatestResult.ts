import { Result } from "@/src/types/Result";
import { fetchApi } from "../../lib/fetchApi";

export async function getLatestResult(): Promise<Result> {
    const resultData = await fetchApi<Result>(`/api/result/latest`)
    return resultData;
}