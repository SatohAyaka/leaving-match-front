import { Stayer } from "@/src/types/Stayer";


export async function getStayers(): Promise<number[]> {
    const response = await fetch(`${process.env.BASE_URL}/api/stayers`);

    if (!response.ok) {
        throw new Error(`滞在者情報取得失敗: ${response.status}`);
    }

    const stayersData: Stayer[] = await response.json();
    const userId: number[] = stayersData.map((stayer) => stayer.id)
    console.log(userId);
    return userId;
}
