import getAllBusTime from "@/src/lib/api/busapi/getAllBustime";
import { BusTime } from "@/src/types/Bus";
import { SelectBusTime } from "@/src/types/BusTime";

export async function findNearBuses(averageMinutes: number): Promise<SelectBusTime> {
    const targetMinutes = averageMinutes - 5;
    const allTimes: BusTime[] = await getAllBusTime();

    let previous: number = 0;
    let nearest: number = 0;
    let next: number = 0;

    let minDiff = Infinity;

    for (let i = 0; i < allTimes.length; i++) {
        const current = allTimes[i].busTime;
        const diff = Math.abs(current - targetMinutes);

        if (diff < minDiff) {
            minDiff = diff;
            nearest = current;
            previous = i > 0 ? allTimes[i - 1].busTime : 0;
            next = i < allTimes.length - 1 ? allTimes[i + 1].busTime : 0;
        }
    }
    console.log(previous, nearest, next);
    const bustime: SelectBusTime = {
        previousTime: previous,
        nearestTime: nearest,
        nextTime: next,
    }

    return bustime;
}