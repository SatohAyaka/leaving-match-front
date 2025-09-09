export const stringTimeToNumber = (dateTime: string) => {
    let timePart: string;

    if (dateTime.includes(" ")) {
        // "YYYY-MM-DD HH:mm:ss" 形式
        const parts = dateTime.split(" ");
        if (parts.length < 2) {
            throw new Error(`Invalid datetime format: ${dateTime}`);
        }
        timePart = parts[1].substring(0, 5); // "HH:mm" 部分を取り出す
    } else {
        // "HH:mm" 形式
        timePart = dateTime.substring(0, 5);
    }

    const [hourStr, minuteStr] = timePart.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (
        isNaN(hour) || isNaN(minute) ||
        hour < 0 || hour > 23 ||
        minute < 0 || minute > 59
    ) {
        throw new Error(`Invalid time format: ${dateTime}`);
    }

    return hour * 60 + minute;
};
