import { Vote } from "@/src/types/Vote";

export async function getCurrentVote(): Promise<Vote> {
    const response = await fetch(`api/bustime/latest`);
    if (!response.ok) {
        throw new Error(`BustimeId取得失敗: ${response.status}`);
    }
    const bustimeId: number = await response.json();

    const voteResponse = await fetch(`api/vote/${bustimeId}`);
    if (!voteResponse.ok) {
        throw new Error(`Vote_Data取得失敗: ${voteResponse.status}`);
    }
    const voteData: Vote = await voteResponse.json();
    return voteData;
}