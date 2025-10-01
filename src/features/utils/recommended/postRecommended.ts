import { Recommended } from "@/src/types/Recommended";
import { fetchApi } from "../../lib/fetchApi";

export async function postRecommended(recommendedTime: number, memberIds: number[]): Promise<Recommended> {
    const query = new URLSearchParams({
        time: recommendedTime.toString(),
    });
    memberIds.forEach(id => query.append("member", id.toString()));
    return fetchApi<Recommended>(`/api/recommended?${query.toString()}`, {
        method: "POST",
    });
}