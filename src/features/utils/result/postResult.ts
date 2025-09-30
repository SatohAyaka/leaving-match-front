export async function postResult(bustimeId: number) {
    const response = await fetch(`https://leaving-match.vercel.app/api/result/${bustimeId}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`Result登録失敗: ${response.status}`);
    }
    return;
}