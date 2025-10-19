export const stringTimeToNumber = (dateTime: string) => {
    if (typeof dateTime === "number") {
        return dateTime;
    }

    if (dateTime.includes("T")) {
        // ISO8601形式
        const date = new Date(dateTime);
        const jstHour = (date.getUTCHours() + 9) % 24;
        const jstMinute = date.getUTCMinutes();
        return jstHour * 60 + jstMinute;
    } else {
        // "HH:mm" 形式
        const [hourStr, minuteStr] = dateTime.substring(0, 5).split(":");
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
    }
};
