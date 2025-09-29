import { Recommended } from "@/src/types/Recommended";

export async function postRecommended(recommendedTime: number, memberIds: number[]): Promise<Recommended> {
    const query = new URLSearchParams({
        time: recommendedTime.toString(),
    });
    memberIds.forEach(id => query.append("member", id.toString()));
    const response = await fetch(`${process.env.REACT_API}/api/recommended?${query.toString()}`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error(`推奨時刻保存失敗: ${response.status}`);
    }
    const recommended: Recommended = await response.json();
    return recommended;
}