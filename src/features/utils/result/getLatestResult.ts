import { Result } from "@/src/types/Result";

export async function getLatestResult(): Promise<Result> {
    const response = await fetch(`${process.env.REACT_API}/api/result/latest`);
    if (!response.ok) {
        throw new Error(`Result_Data取得失敗: ${response.status}`);
    }
    const resultData: Result = await response.json();
    return resultData;
}