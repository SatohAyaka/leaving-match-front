export function dateJadge(isoTime: string): boolean {
  const nowJST = new Date(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
  const targetJST = new Date(new Date(isoTime).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));

  const today = new Date(nowJST.getFullYear(), nowJST.getMonth(), nowJST.getDate());
  const targetDate = new Date(targetJST.getFullYear(), targetJST.getMonth(), targetJST.getDate());

  return targetDate.getTime() == today.getTime();
}