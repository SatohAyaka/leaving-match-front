export const stringTimeToNumber = (stringTime: string) => {
    const [hourStr, minuteStr] = stringTime.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    if (
        isNaN(hour) || isNaN(minute) ||
        hour < 0 || hour > 23 ||
        minute < 0 || minute > 59
    ) {
        throw new Error(`Invalid time format: ${stringTime}`);
    }

    return hour * 60 + minute;
}