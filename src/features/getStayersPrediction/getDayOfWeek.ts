export function getDayOfWeek(): number {
    const today = new Date();
    const dayOfWeek = today.getDay();
    console.log(dayOfWeek);

    return dayOfWeek;
}