export function dateJadge(isoTime: string): boolean {
  const now = new Date();
  const target = new Date(isoTime);

  // 両方をその日の0時0分0秒にリセット
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());

  // targetが未来の日付ならtrue
  return targetDate.getTime() > today.getTime();
}