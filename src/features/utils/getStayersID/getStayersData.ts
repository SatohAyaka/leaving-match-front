import { Stayer } from "@/src/types/Stayer";
import { fetchApi } from "../../lib/fetchApi";


export async function getStayers(): Promise<number[]> {
    const stayersData: Stayer[] = await fetchApi<Stayer[]>("/api/stayers");
    return stayersData.map((stayer) => stayer.id);
}
