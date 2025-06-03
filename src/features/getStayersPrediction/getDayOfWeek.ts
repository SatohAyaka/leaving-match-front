export function getDayOfWeek(): number {
    const today = new Date();
    let dayOfWeek = today.getDay();
    if (dayOfWeek == 0) {
        dayOfWeek += 6;
    } else {
        dayOfWeek -= 1;
    }
    console.log(dayOfWeek);

    return dayOfWeek;
}