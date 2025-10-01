import { Vote } from "@/src/types/Vote";
import { fetchApi } from "../../lib/fetchApi";

export async function getCurrentVote(): Promise<Vote> {
    const bustimeId: number = await fetchApi<number>(`/api/bustime/latest`);
    const voteData: Vote = await fetchApi<Vote>(`/api/vote/${bustimeId}`);
    return voteData;
}