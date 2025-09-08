import { BusTime } from "@/src/types/Bus";
import { GetBusTime } from "./getAllBusTimes";
import { SelectBusTime } from "@/src/types/BusTime";

export async function findNearBuses(targetMinutes: number): Promise<SelectBusTime> {
    const allTimes: BusTime[] = await GetBusTime();

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