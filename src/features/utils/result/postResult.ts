export async function postResult(bustimeId: number) {
    const response = await fetch(`api/result/${bustimeId}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`Result登録失敗: ${response.status}`);
    }
    return;
}