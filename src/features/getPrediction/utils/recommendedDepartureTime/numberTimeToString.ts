export const numberTimeToString = (numberTime: number) => {
    const hour = Math.floor(numberTime / 60);
    const minute = numberTime % 60;

    // 2桁にゼロ埋め
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');

    return `${hourStr}:${minuteStr}`;
}