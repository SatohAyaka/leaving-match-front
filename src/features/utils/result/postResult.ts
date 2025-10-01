import { fetchApi } from "../../lib/fetchApi";

export async function postResult(bustimeId: number) {
    await fetchApi(`api/result/${bustimeId}`, {
        method: "POST",
    });
    return;
}